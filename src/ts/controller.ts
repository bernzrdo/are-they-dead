import { params, PersonData } from '../../shared';
import ErrorPage from './page/Error';
import HomePage from './page/Home';
import LoadingPage from './page/Loading';
import PersonPage from './page/Person';
import DirectoryPage from './page/Directory';

interface Options {
    transform?: (url: URL) => any
    initial?: boolean
}

const NOT_FOUND_CODE = 404
const NOT_FOUND_MSG = 'We couldn\'t find that person. Please try searching for someone else or refine your search.'

export async function updatePage({ transform, initial }: Options = {}){

    // update url if asked to
    const url = new URL(location.href)
    if(transform){
        transform(url)
        history.pushState({}, '', url)
    }

    // /directory/
    if(
        url.pathname.startsWith('/directory/') &&
        DATA?.result != 'not-found'
    ){
        DirectoryPage()
        return
    }

    // [home]
    if(url.pathname == '/'){
        document.title = 'Are They Dead?'
        HomePage()
        return
    }

    // if first load, it comes with data from the server
    // this is to make waiting time lower
    if(initial && DATA){

        // no need to update title since it already comes correct from the server

        // [not found]
        if(DATA.result == 'not-found'){
            ErrorPage(NOT_FOUND_CODE, NOT_FOUND_MSG)
            return
        } 

        // [person]
        if(DATA.result == 'person'){
            PersonPage({
                person: DATA.person,
                image: DATA.image,
                isEvil: DATA.isEvil
            })
            return
        }
        
        throw new Error('Unexpected data!')
    }
    
    // [person]

    document.title = 'Are They Dead?'
    LoadingPage()

    // request data
    const name = decodeURIComponent(location.pathname.substring(1))
    const res = await fetch(`/api/person?${params({ name })}`)
    if(!res.ok){
        ErrorPage(res.status, 'An error occured! Sorry about that.')
        return
    }

    const info: PersonData = await res.json()
    if(info.result == 'not-found'){
        document.title = 'Not Found · Are They Dead?'
        ErrorPage(NOT_FOUND_CODE, NOT_FOUND_MSG)
        return
    }

    document.title = `Is ${info.person.name} Dead?`
    PersonPage({
        person: info.person,
        image: info.image,
        isEvil: info.isEvil,
        death: info.death
    })

}