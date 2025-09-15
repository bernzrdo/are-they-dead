import { createCanvas, GlobalFonts, Image, loadImage, SKRSContext2D } from '@napi-rs/canvas'
import { join } from 'path'

const WIDTH = 1200
const HEIGHT = 630
const PADDING = 75
const GAP = 25

const SAFE_HEIGHT = HEIGHT - (PADDING + PADDING)
const TEXT_WIDTH = WIDTH - (PADDING + SAFE_HEIGHT + GAP + PADDING)
const LINE_OFFSET = -50

let iconImg: Image | null = null
async function icon(): Promise<Image> {

    if(!iconImg)
        iconImg = await loadImage(join(__dirname, '../public/img/icon-2048x.png'))

    return iconImg
}

const FONT = 'Instrument Serif'
GlobalFonts.registerFromPath(join(__dirname, '../font/InstrumentSerif.ttf'), FONT)

interface Line {
    text: string
    y: number
}

function wrap(text: string, size: number, ctx: SKRSContext2D): { lines: Line[], height: number } | null {

    // set size
    ctx.font = `${size}px ${FONT}`

    const words = text.trim().split(/\s+/g)
    let y = 0

    let lines: Line[] = []

    while(words.length > 0){

        // check where line breaks

        let lastWord = words.length

        while(true){
            
            const metrics = ctx.measureText(words.slice(0, lastWord).join(' '))
            const width = metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft
            
            // stop if it fits
            if(width < TEXT_WIDTH) break

            // remove one word
            lastWord--

            // can't fit any word
            if(lastWord == 0) return null

        }

        // check if height's too big
        const metrics = ctx.measureText(words.slice(0, lastWord).join(' '))
        const height = metrics.emHeightAscent + metrics.emHeightDescent + LINE_OFFSET
        if(y + height > SAFE_HEIGHT) return null

        // write line
        lines.push({
            text: words.slice(0, lastWord).join(' '),
            y
        })

        // remove words
        words.splice(0, lastWord)

        // update y
        y += height

    }

    return { lines, height: y }
}

export async function generateImage(text: string){
    if(!text) throw new Error('Invalid text.')
    
    const canvas = createCanvas(WIDTH, HEIGHT)
    const ctx = canvas.getContext('2d')
    
    // background
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, WIDTH, HEIGHT)

    // icon
    ctx.drawImage(
        await icon(),
        PADDING, PADDING,
        SAFE_HEIGHT, SAFE_HEIGHT
    )

    // text

    // find size

    let size = 150

    let last: { too: 'big' | 'small', size: number } | null = null

    while(true){

        const wrapped = wrap(text, size, ctx)

        // if it's too big
        if(wrapped == null){

            // if last was too small, use last
            if(last?.too == 'small'){
                size = last.size
                break
            }

            last = { too: 'big', size }
            size--

            continue
        }

        // if it's too small
        if(wrapped.height < SAFE_HEIGHT){

            // if last was too big, use current
            if(last?.too == 'big')
                break

            last = { too: 'small', size }
            size++

            continue
        }

        // fits like a glove!
        break

    }

    ctx.fillStyle = '#000'
    ctx.textBaseline = 'top'
    ctx.textAlign = 'left'
    const wrapped = wrap(text, size, ctx)
    if(wrapped){

        for(let { text, y } of wrapped.lines)
            ctx.fillText(text, PADDING + SAFE_HEIGHT + GAP, PADDING + y)

    }

    return canvas.toBuffer('image/png')
}

export function imageUrl(text: string){
    return `/api/image?text=${encodeURIComponent(text)}`
}