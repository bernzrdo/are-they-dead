import { readFileSync } from 'fs'
import { join } from 'path'
import { Data } from '../shared'

const html = readFileSync(join(__dirname, '../src/index.html'), 'utf-8')

interface Options {
    title: string
    description: string
    image: string
    type: 'website' | 'article'
    url: string
    tags?: string[]
    data?: Data
    content?: string
}

const TAG = '<meta property="article:tag" content="[TAG]">'

export function render(options: Options){
    return html
        .replaceAll('[TITLE]', options.title)
        .replaceAll('[DESCRIPTION]', options.description)
        .replaceAll('[IMAGE]', options.image)
        .replaceAll('[TYPE]', options.type)
        .replaceAll('[URL]', options.url)
        .replaceAll('[TAGS]', (options.tags ?? [])
            .map(tag=>TAG.replaceAll('[TAG]', tag))
            .join('')
        )
        .replaceAll('[DATA]', JSON.stringify(options.data))
        .replaceAll('[CONTENT]', options.content ?? '')
}
