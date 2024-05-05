import { generateConstructorErrorMessage } from '../../shared/utils'
import { isExposeInstructionParam, isExposeInstructionParams } from './guards'
import {
    type ExposeInstructionParam,
    type ExposeInstructionParams,
    type ExposePortDefinition,
    type IExposeInstruction
} from './types'
import { coerceExposeDefinition } from './utils'

export class ExposeInstruction implements IExposeInstruction {
    type = 'instruction' as const

    exposeCmds: ExposePortDefinition[]

    public constructor(...exposes: ExposeInstructionParams) {
        if (!isExposeInstructionParams(exposes)) throw new Error(generateConstructorErrorMessage('EXPOSE', exposes))

        this.exposeCmds = exposes.map((e) => coerceExposeDefinition(e))
    }

    public addExposeArg(expose: ExposeInstructionParam): this {
        if (!isExposeInstructionParam(expose)) throw new Error('Invalid parameter value for addExposeArg')

        this.exposeCmds.push(coerceExposeDefinition(expose))

        return this
    }

    public toString(): string {
        return ['EXPOSE', ...this.exposeCmds.map(({ port, proto }) => `${port}/${proto}`)].join(' ')
    }
}
