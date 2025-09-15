import { updatePage } from '../controller'
import Search from './Search'

export default function(options?: { title?: string, search?: string }){
    
    const $header = document.createElement('header')

        const $home = document.createElement('a')
        $home.href = '/'
        $home.addEventListener('click', e=>{
            e.preventDefault()
            updatePage({ transform: url=>url.pathname = '/' })
        })

            const $icon = new Image()
            $icon.src = '/img/icon.svg'
            $icon.alt = 'Grave'
            $home.appendChild($icon)

            $home.appendChild(document.createTextNode(options?.title ?? 'Are They Dead?'))

        $header.appendChild($home)

        $header.appendChild(Search(options?.search))

    return $header
}