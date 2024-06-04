import { AbstractBuildableInstruction } from '../../common/classes/instructions/buildable/class'
import { generateConstructorErrorMessage } from '../../shared/utils'
import { isExposeInstructionParam, isExposeInstructionParams } from './guards'
import {
    type ExposeInstructionParam,
    type ExposeInstructionParams,
    type ExposePortDefinition,
    type IExposeInstruction
} from './types'
import { coerceExposeDefinition } from './utils'

export class ExposeInstruction extends AbstractBuildableInstruction implements IExposeInstruction {
    type = 'instruction' as const

    instruction = 'EXPOSE' as const

    exposeCmds: ExposePortDefinition[]

    public constructor(...exposeParams: ExposeInstructionParams) {
        super()

        if (!isExposeInstructionParams(exposeParams))
            throw new Error(generateConstructorErrorMessage('EXPOSE', exposeParams))

        this.exposeCmds = exposeParams.map((e) => coerceExposeDefinition(e))
    }

    public addExposeParam(exposeParam: ExposeInstructionParam): this {
        if (!isExposeInstructionParam(exposeParam)) throw new Error('Invalid parameter value for addExposeArg')

        this.exposeCmds.push(coerceExposeDefinition(exposeParam))

        return this
    }

    public toString(): string {
        const output: string[] = [this.instruction]

        if (this.onBuild) output.unshift('ONBUILD')

        this.exposeCmds.map(({ port, proto }) => `${port}/${proto}`).forEach((e) => output.push(e))

        return output.join(' ')
    }
}
