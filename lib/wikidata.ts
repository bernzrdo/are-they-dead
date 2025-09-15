import { createHash } from 'crypto'
import { Death, params, Person } from '../shared'

export async function findPerson(search: string): Promise<Person | null> {

    const res = await fetch(`https://www.wikidata.org/w/api.php?${params({
        action: 'wbsearchentities',
        search,
        limit: '1',
        language: 'en',
        format: 'json'
    })}`)
    const data = await res.json()

    const [entry] = data.search
    
    return entry ? {
        id: entry.id,
        name: entry.display.label.value,
        description: entry.display.description.value
    } : null
}


export type Claims = Record<string, any[]>

const INSTANCE_OF = 'P31'
const IMAGE = 'P18'

const DATE_OF_DEATH = 'P570'
const PLACE_OF_DEATH = 'P20'
const CAUSE_OF_DEATH = 'P509'
const MANNER_OF_DEATH = 'P1196'

const PLACE_OF_BURIAL = 'P119'
const DATE_OF_BURIAL_OR_CREMATION = 'P4602'
const IMAGE_OF_GRAVE = 'P1442'

const HUMAN = 'Q5'

export async function getClaims(id: string): Promise<Claims | undefined> {

    const res = await fetch(`https://www.wikidata.org/w/api.php?${params({
        action: 'wbgetentities',
        ids: id,
        props: 'claims',
        format: 'json'
    })}`)
    const { entities } = await res.json()
    if(!entities) return

    return entities[id].claims
}

async function getClaimVal(claims: Claims, property: string){
    
    if(
        typeof claims[property] == 'undefined' ||
        claims[property].length == 0
    ) return undefined

    const { mainsnak } = claims[property].find(c=>c.rank == 'preferred') 
               ?? claims[property].find(c=>c.rank == 'normal')
               ?? claims[property][0]

    if(mainsnak.datatype == 'commonsMedia'){
        // commons url

        const filename = mainsnak.datavalue?.value
        if(!filename) return

        const img = mainsnak.datavalue.value.replace(/ /g, '_')
        const hash = createHash('md5').update(img).digest('hex')

        // return `https://upload.wikimedia.org/wikipedia/commons/${hash[0]}/${hash[0]}${hash[1]}/${encodeURIComponent(img)}`;
        return `https://upload.wikimedia.org/wikipedia/commons/thumb/${hash[0]}/${hash[0]}${hash[1]}/${encodeURIComponent(img)}/512px-${encodeURIComponent(img)}`
    }

    if(mainsnak.datatype == 'time'){
        // date/time

        const time = mainsnak.datavalue?.value?.time
        if(!time) return

        return new Date(time.replace(/^\+/, ''))
    }

    if(mainsnak.datatype == 'wikibase-item'){
        // entity

        const id = mainsnak.datavalue?.value?.id
        if(!id) return

        const res = await fetch(`https://www.wikidata.org/w/api.php?${params({
            action: 'wbgetentities',
            ids: id,
            props: 'labels',
            languages: 'en',
            format: 'json'
        })}`)
        const { entities } = await res.json()
        if(!entities) throw new Error('Failed to get value.')

        return entities[id].labels.en.value as string
    }

    throw new Error(`Unknown dataype ${mainsnak.datatype} for property ${property}`)
}

export async function isHuman(claims: Claims){
    return INSTANCE_OF in claims && claims[INSTANCE_OF].some(c=>c.mainsnak.datavalue.value.id == HUMAN)
}

export async function getImage(claims: Claims){
    return await getClaimVal(claims, IMAGE) as string | undefined
}

export async function parseDeath(claims: Claims): Promise<Death> {

    // check if person is dead
    const isDead = (
        DATE_OF_DEATH in claims ||
        PLACE_OF_DEATH in claims ||
        CAUSE_OF_DEATH in claims ||
        MANNER_OF_DEATH in claims ||
        PLACE_OF_BURIAL in claims ||
        DATE_OF_BURIAL_OR_CREMATION in claims ||
        IMAGE_OF_GRAVE in claims
    )

    return isDead
        ? {
            died: true,
            date: await getClaimVal(claims, DATE_OF_DEATH) as Date | undefined,
            place: await getClaimVal(claims, PLACE_OF_DEATH) as string | undefined,
            cause: await getClaimVal(claims, CAUSE_OF_DEATH) as string | undefined,
            manner: await getClaimVal(claims, MANNER_OF_DEATH) as string | undefined
        }
        : { died: false }

}