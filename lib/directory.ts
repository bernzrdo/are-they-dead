import { Router } from 'express'
import { render } from './render'
import { imageUrl } from './image'
import { filterCache } from './api'
import people from './people'

const directory = Router()

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

directory.get('/start', (req, res)=>{

    res.send(render({
        title: 'Directory · Are They Dead?',
        description: 'Robots only!',
        image: imageUrl('Are They Dead?'),
        type: 'website',
        url: new URL(req.url, process.env.URL!).href,
        content: ALPHABET.split('').map(c=>`<a href="${c.toLowerCase()}">${c}</a>`).join('')
    }))

})

directory.get('/:query', (req, res)=>{

    let { query } = req.params
    query = query.toLowerCase()

    const results = [...new Set([
        ...filterCache(query),
        ...(people.filter(n=>n.toLowerCase().startsWith(query)))
    ])].sort()

    const content = results.length > 0
        ? results.map(name=>`<a href="/${name}">${name}</a>`).join('')
        : `No people found starting with "${query}".`

    res.send(render({
        title: `${query} Directory · Are They Dead?`,
        description: 'Robots only!',
        image: imageUrl('Are They Dead?'),
        type: 'website',
        url: new URL(req.url, process.env.URL!).href,
        content
    }))

})

export default directory