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

    public constructor(...exposeParams: ExposeInstructionParams) {
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
        return ['EXPOSE', ...this.exposeCmds.map(({ port, proto }) => `${port}/${proto}`)].join(' ')
    }
}
