import { generateConstructorErrorMessage } from '../../shared/utils'
import { isExposeInstructionParameters, isExposeInstructionParameter } from './guards'
import {
    type IExposeInstruction,
    type ExposePortDefinition,
    type ExposeInstructionParameters,
    type ExposeInstructionParameter
} from './types'
import { coerceExposeDefinition } from './utils'

export class ExposeInstruction implements IExposeInstruction {
    type = 'instruction' as const

    exposeCmds: ExposePortDefinition[]

    public constructor(...exposes: ExposeInstructionParameters) {
        if (!isExposeInstructionParameters(exposes)) throw new Error(generateConstructorErrorMessage('EXPOSE', exposes))

        this.exposeCmds = exposes.map((e) => coerceExposeDefinition(e))
    }

    public addExposeArg(expose: ExposeInstructionParameter): this {
        if (!isExposeInstructionParameter(expose)) throw new Error('Invalid parameter value for addExposeArg')

        this.exposeCmds.push(coerceExposeDefinition(expose))

        return this
    }

    public toString(): string {
        return ['EXPOSE', ...this.exposeCmds.map(({ port, proto }) => `${port}/${proto}`)].join(' ')
    }
}
