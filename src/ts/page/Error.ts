import Footer from '../ui/Footer'
import Header from '../ui/Header'
import Search from '../ui/Search'
import { $root } from '../util/elements'

export default function(code: number, message: string){

    $root.innerHTML = ''
    $root.className = 'error'

    $root.appendChild(Header())

    const $main = document.createElement('main')

        const $code = document.createElement('h1')
        $code.textContent = code.toString()
        $main.appendChild($code)

        const $message = document.createElement('p')
        $message.textContent = message
        $main.appendChild($message)

        $main.appendChild(Search())

    $root.appendChild($main)

    $root.appendChild(Footer())

}