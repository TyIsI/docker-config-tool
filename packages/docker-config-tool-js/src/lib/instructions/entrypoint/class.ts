import { isString, isStringArray } from '../../shared/guards'
import { generateConstructorErrorMessage } from '../../shared/utils'
import { type EntryPointInstructionParams, type IEntryPointInstruction } from './types'

export class EntryPointInstruction implements IEntryPointInstruction {
    type = 'instruction' as const

    entrypointCmds: string[]

    public constructor(...entrypointParams: EntryPointInstructionParams) {
        if (!isStringArray(entrypointParams))
            throw new Error(generateConstructorErrorMessage('ENTRYPOINT', entrypointParams))

        this.entrypointCmds =
            entrypointParams.length === 1 && entrypointParams[0].includes(' ')
                ? entrypointParams[0].split(' ')
                : entrypointParams
    }

    public addEntrypointArg(entrypoint: string): this {
        if (!isString(entrypoint)) throw new Error('Invalid entrypoint argument')

        this.entrypointCmds.push(entrypoint)

        return this
    }

    public toString(): string {
        return ['ENTRYPOINT', JSON.stringify(this.entrypointCmds)].join(' ')
    }
}
