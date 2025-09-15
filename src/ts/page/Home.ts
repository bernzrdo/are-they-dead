import Footer from '../ui/Footer';
import Search from '../ui/Search';
import { $root } from '../util/elements';

export default function(title?: string){

    $root.innerHTML = ''
    $root.className = 'home'

    const $main = document.createElement('main')

        const $icon = new Image()
        $icon.src = '/img/icon.svg'
        $icon.alt = 'Grave'
        $main.appendChild($icon)

        const $title = document.createElement('h1')
        $title.textContent = title ?? 'Are They Dead?'
        $main.appendChild($title)

        const $subtitle = document.createElement('p')
        $subtitle.textContent = 'Find out instantly if someone is alive or dead. Updated in real time.'
        $main.appendChild($subtitle)

        $main.appendChild(Search())

    $root.appendChild($main)

    $root.appendChild(Footer())

}