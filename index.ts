import express from 'express'
import { render } from './lib/render'
import { generateImage, imageUrl } from './lib/image'
import { getDeath, getInfo, InfoCache, InfoCachePerson } from './lib/api'
import evil from './lib/evil'
import { parseDeath } from './lib/wikidata'
import { PersonData } from './shared'
import directory from './lib/directory'

const app = express()
app.use(express.static('public'))

function description(name?: string){
    return `Find out instantly if ${name ?? 'someone'} is alive or dead. Updated in real time.`
}

app.get('/', (req, res)=>res.send(render({
    title: 'Are They Dead?',
    description: description(),
    image: imageUrl('Are They Dead?'),
    type: 'website',
    url: process.env.URL!
})))

app.get('/api/image', async (req, res)=>{

    const { text } = req.query

    if(typeof text != 'string' || !text)
        return res.status(400).json({ error: 'Invalid "text" parameter.' })

    res.set('Content-Type', 'image/png')
    res.send(await generateImage(text))

})

app.get('/api/person', async (req, res)=>{
    
    const { name } = req.query

    if(typeof name != 'string')
        return res.status(400).json({ error: 'Invalid "name" parameter.' })

    let { info, claims } = await getInfo(name)

    // not found
    if(!info) return res.json({ result: 'not-found' } satisfies PersonData)

    // redirect
    if(info.type == 'redirect'){
        const res = await getInfo(info.name)
        info = res.info as InfoCachePerson
        claims = res.claims
    }

    res.json({
        result: 'person',
        person: info.person,
        image: info.image,
        isEvil: evil.includes(info.person.id),
        // reuse claims if existing
        death: claims ? await parseDeath(claims) : undefined
    } satisfies PersonData)

})

app.get('/api/death', async (req, res)=>{

    const { id } = req.query

    if(typeof id != 'string')
        return res.status(400).json({ error: 'Invalid "id" parameter.' })

    res.json(await getDeath(id))

})

app.use('/directory', directory)

app.get('/:name', async (req, res, next)=>{

    const { info } = await getInfo(req.params.name)

    // not found
    if(!info) return next()

    // redirect
    if(info.type == 'redirect')
        return res.redirect('/' + encodeURIComponent(info.name))

    res.send(render({
        title: `Is ${info.person.name} Dead?`,
        description: description(info.person.name),
        image: info.image ?? imageUrl(`Is ${info.person.name} Dead?`),
        type: 'article',
        url: new URL('/' + encodeURIComponent(info.person.name), process.env.URL!).href,
        tags: [
            info.person.name,
            'are they dead', 'are they alive', 'alive or dead', 'alive', 'dead',
            'celebrity', 'politician', 'historical figure', 'athlete', 'musician', 'actor', 'influencer'
        ],
        data: {
            result: 'person',
            person: info.person,
            image: info.image,
            isEvil: evil.includes(info.person.id)
        }
    }))

})

app.use((req, res)=>res.status(404).send(render({
    title: 'Not Found · Are They Dead?',
    description: 'Find out instantly if someone is alive or dead. Updated in real time.',
    image: imageUrl('Not Found'),
    type: 'website',
    url: new URL(req.url, process.env.URL!).href,
    data: { result: 'not-found' }
})))

app.listen(process.env.PORT, ()=>console.log(`Ready! http://localhost:${process.env.PORT}`));