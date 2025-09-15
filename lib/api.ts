import { Person } from '../shared'
import { Claims, findPerson, getClaims, getImage, isHuman, parseDeath } from './wikidata'

export interface InfoCacheRedirect {
    type: 'redirect'
    name: string
}

export interface InfoCachePerson {
    type: 'person'
    person: Person
    image?: string
}

export type InfoCache = InfoCacheRedirect | InfoCachePerson

let cache: Record<string, InfoCache> = {}

function simplify(str: string){
    return str
        .trim()
        .replace(/\s+/g, ' ')
        .toLowerCase()
}

export async function getInfo(name: string){

    // simplify name
    name = simplify(name)

    if(name in cache)
        return { info: cache[name] }

    // create cache

    // find wikidata person
    const person = await findPerson(name)
    if(!person) return {}
    const simpleName = simplify(person.name)

    // get claims
    const claims = await getClaims(person.id)
    if(!claims) throw new Error('Invalid person ID.')

    // check if it's human
    if(!await isHuman(claims)) return {}

    // save redirect cache
    if(name != simpleName){
        cache[name] = {
            type: 'redirect',
            name: person.name
        }
    }

    // save person cache
    const info: InfoCachePerson = {
        type: 'person',
        person,
        image: await getImage(claims)
    }
    cache[simplify(person.name)] = info

    return { info, claims }
}

export async function getDeath(id: string){
    const claims = await getClaims(id)
    if(claims) return parseDeath(claims)
}

export function filterCache(query: string){
    query = query.toLowerCase()
    return Object.values(cache)
        .filter(c=>c.type == 'person' && c.person.name.toLowerCase().startsWith(query))
        .map(c=>(c as InfoCachePerson).person.name)
}