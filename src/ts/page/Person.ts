import { Death, params, Person } from '../../../shared'
import Footer from '../ui/Footer'
import Header from '../ui/Header'
import { confetti } from '../util/confetti'
import { $root } from '../util/elements'

function status(name: string, death: Death, isEvil: boolean){
    return isEvil
        ? (death.died
            ? `${name} is dead!`
            : `Unfortunately, ${name} is still alive.`
        )
        : (death.died
            ? `${name} has passed away.`
            : `${name} is still alive.`
        )
}

function formatDate(date: Date | string){
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(new Date(date))
}

function details(death: Death){
    if(!death.died) return ''

    let res = ''

    if(death.date) res += ` on ${formatDate(death.date)}`
    if(death.place) res += ` in ${death.place}`

    if(death.cause && death.manner) res += ` by ${death.cause} (${death.manner})`
    else if(death.cause || death.manner) res += ` by ${death.cause ?? death.manner}`

    if(!res) return ''

    return `Died ${res}.`
}

export default function({ person, image, death, isEvil }: { person: Person, image?: string, death?: Death, isEvil: boolean }){

    $root.innerHTML = ''
    $root.className = 'person'

    $root.appendChild(Header({ title: `Is ${person.name} Dead?` }))

    const $main = document.createElement('main')
    $main.className = 'loading'

        const $status = document.createElement('h1')
        $status.textContent = '\xa0'
        $main.appendChild($status)

        const $details = document.createElement('p')
        $details.className = 'details'
        $details.textContent = '\xa0'
        $main.appendChild($details)

        let $img: HTMLImageElement
        if(image){
            $img = new Image()
            $img.src = image
            $main.appendChild($img)
        }

        const $about = document.createElement('div')
        $about.className = 'about'

            const $name = document.createElement('h3')
            $name.textContent = person.name
            $about.appendChild($name)

            const $description = document.createElement('p')
            $description.textContent = person.description
            $about.appendChild($description)

        $main.appendChild($about)

    $root.appendChild($main)

    $root.appendChild(Footer())

    function render(death: Death){

        // update status
        $status.textContent = status(person.name, death, isEvil)
        $details.textContent = details(death)
        
        // update image
        if($img) $img.classList.toggle('bw', death.died)
        
        // evil confetti
        if(isEvil && death.died){
            confetti.addConfetti({
                confettiColors: [
                    '#ff383c', '#ff8d28', '#ffcc00', '#34c759',
                    '#00c8b3', '#00c3d0', '#00c0e8', '#0088ff',
                    '#6155f5', '#cb30e0', '#ff2d55'
                ]
            })
        }

        $main.classList.remove('loading')

    }
    if(death) render(death)

    async function refresh(){
        try{

            $main.classList.add('loading')
            
            const res = await fetch(`/api/death?${params({ id: person.id })}`)
            const death: Death = await res.json()
            
            if(death) render(death)
            else throw new Error('No death info given.')

        }catch(err){

            $status.textContent = 'An error occurred.'
            $details.textContent = ''
            $main.classList.remove('loading')

            console.error(err)

        }

    }
    if(!death) refresh()

}