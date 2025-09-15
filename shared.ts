
export interface Person {
    id: string
    name: string
    description: string
}

export type Data =
    | { result: 'person', person: Person, image?: string, isEvil: boolean }
    | { result: 'not-found' }
    | null

export type PersonData =
    | { result: 'person', person: Person, image?: string, isEvil: boolean, death?: Death }
    | { result: 'not-found' }

export type Death = { died: false } | {
    died: true
    date?: Date
    place?: string
    cause?: string
    manner?: string
}

export function params(params: Record<string, string>): string {
    return new URLSearchParams(params).toString()
}