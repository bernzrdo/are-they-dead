
const html = document.querySelector('noscript')!.innerHTML.match(/<footer>(.*)<\/footer>/s)![1]

export default function(){
    const $footer = document.createElement('footer')
    $footer.innerHTML = html
    return $footer
}