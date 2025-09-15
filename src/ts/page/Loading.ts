import Footer from '../ui/Footer'
import Header from '../ui/Header'
import { $root } from '../util/elements'

export default function(){

    $root.innerHTML = ''
    $root.className = 'loading'

    $root.appendChild(Header())

    const $main = document.createElement('main')

        const $icon = document.createElement('div')
        $icon.className = 'icon'
        $main.appendChild($icon)

    $root.appendChild($main)

    $root.appendChild(Footer())
    
}