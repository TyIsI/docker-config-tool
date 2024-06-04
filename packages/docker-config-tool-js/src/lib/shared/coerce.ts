import { z } from 'zod'

import { isFileAccessMode, isString, isStringArray } from './guards'

export const coerceFileAccessMode = (value: unknown): string => {
    if (!isFileAccessMode(value)) throw new Error('Invalid file access mode')

    return coerceString(value)
}

export const coerceNumber = (value: unknown): number => {
    const result = z.coerce.number().safeParse(value)

    if (!result.success) throw new Error(`Invalid number: ${result.error.issues[0].message}`)

    return result.data
}

export const coerceString = (value: unknown): string => {
    return z.coerce.string().parse(value)
}

export const coerceStringArray = (value: unknown): string[] => {
    if (!isStringArray(value) && !isString(value)) throw new Error('Invalid string array')

    return isStringArray(value) ? value : [value]
}

export const coerceFirstValue = <T = unknown>(...value: Array<T | null | undefined>): T => {
    const result = z.array(z.unknown()).nonempty().safeParse(value)

    if (!result.success) throw new Error('Not a valid array')

    const validMatches = value.filter((e) => e != null)

    if (validMatches.length === 0) throw new Error('No non null array elements')

    return validMatches[0] as T
}
