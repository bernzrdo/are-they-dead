import { updatePage } from '../controller'

export default function(value?: string){

    const $search = document.createElement('div')
    $search.className = 'search'

        function search(){

            const query = $input.value.trim()
            if(!query) return

            updatePage({
                transform: url=>url.pathname = `/${encodeURIComponent(query)}`
            })

        }

        const $input = document.createElement('input')
        $input.placeholder = 'Search for someone...'
        $input.addEventListener('keydown', e=>e.key == 'Enter' && search())
        if(value) $input.value = value
        $search.appendChild($input)

        const $button = document.createElement('button')
        $button.textContent = 'Check'
        $button.addEventListener('click', ()=>search())
        $search.appendChild($button)

    return $search

}