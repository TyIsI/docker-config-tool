import { isString, isStringArray } from '../../shared/guards'
import { generateConstructorErrorMessage } from '../../shared/utils'
import { type EntryPointInstructionParameters, type IEntryPointInstruction } from './types'

export class EntryPointInstruction implements IEntryPointInstruction {
    type = 'instruction' as const

    entrypointCmds: string[]

    public constructor(...entrypointCmds: EntryPointInstructionParameters) {
        if (!isStringArray(entrypointCmds))
            throw new Error(generateConstructorErrorMessage('ENTRYPOINT', entrypointCmds))

        this.entrypointCmds =
            entrypointCmds.length === 1 && entrypointCmds[0].includes(' ')
                ? entrypointCmds[0].split(' ')
                : entrypointCmds
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
