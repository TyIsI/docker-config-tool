import { AbstractBuildableInstruction } from '../../common/classes/instructions/buildable/class'
import { isString, isStringArray } from '../../shared/guards'
import { generateConstructorErrorMessage } from '../../shared/utils'
import { type EntryPointInstructionParams, type IEntryPointInstruction } from './types'

export class EntryPointInstruction extends AbstractBuildableInstruction implements IEntryPointInstruction {
    type = 'instruction' as const

    instruction = 'ENTRYPOINT' as const

    entrypointCmds: string[]

    public constructor(...entrypointParams: EntryPointInstructionParams) {
        super()

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
        const output: string[] = [this.instruction]

        if (this.onBuild) output.unshift('ONBUILD')

        output.push(JSON.stringify(this.entrypointCmds))

        return output.join(' ')
    }
}
