import { type ZodError } from 'zod'

export const generateErrorMessage = (
    baseErrorMessage: string,
    ...args: Array<string | number | object | null | boolean | undefined>
): string => {
    return args.reduce<string>((c, e) => `${c} ${typeof e} ${JSON.stringify(e)}`, baseErrorMessage)
}

export const generateConstructorErrorMessage = (
    cmdId: string,
    ...args: Array<string | number | object | null | boolean | undefined>
): string => {
    if (cmdId == null) throw new Error('Missing cmdId')

    return generateErrorMessage(
        `Invalid or missing arguments while attempting to create new ${cmdId} instance:`,
        ...args
    )
}

export const generateInvalidArgumentErrorMessage = (
    cmdId: string,
    ...args: Array<string | number | object | null | boolean | undefined>
): string => {
    if (cmdId == null) throw new Error('Missing cmdId')

    return generateErrorMessage(`Invalid ${cmdId} argument:`, ...args)
}

export const randomString = (length?: number): string => {
    length = length ?? 1

    return Array.from(Array(length), () => Math.round(Math.random() * Math.pow(2, 48)).toString(26)).join('')
}

export const reduceZodErrors = (error: ZodError): string[] => {
    return error.issues.reduce<string[]>((c, e) => {
        c.push(e.message)

        return c
    }, [])
}

export const getCommonPath = (cwd: string, testPath: string): string => {
    for (let i = 0; i < cwd.length; i++) {
        if (cwd.at(i) !== testPath.at(i)) return testPath.substring(0, i)
    }

    return testPath
}
