import Footer from '../ui/Footer'
import Header from '../ui/Header'
import { $root } from '../util/elements'

export default function(){

    const html = $root.innerHTML

    $root.innerHTML = ''
    $root.className = 'directory'

    $root.appendChild(Header())

    const $main = document.createElement('main')
    $main.innerHTML = html
    $root.appendChild($main)

    $root.appendChild(Footer())

}