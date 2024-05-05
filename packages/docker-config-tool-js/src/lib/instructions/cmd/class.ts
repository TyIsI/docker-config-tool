import { isString, isStringArray } from '../../shared/guards'
import { generateConstructorErrorMessage } from '../../shared/utils'
import { type CmdInstructionParams, type ICmdInstruction } from './types'

export class CmdInstruction implements ICmdInstruction {
    type = 'instruction' as const

    commands: string[] = []

    public constructor(...cmdParams: CmdInstructionParams) {
        if (!isStringArray(cmdParams)) throw new Error(generateConstructorErrorMessage('CMD', cmdParams))

        this.commands = cmdParams.length === 1 ? cmdParams[0].split(' ') : cmdParams
    }

    public addCmd(cmdParam: string): this {
        if (!isString(cmdParam)) throw new Error(`Invalid cmd argument: ${typeof cmdParam} ${JSON.stringify(cmdParam)}`)

        this.commands.push(cmdParam)

        return this
    }

    public toString(): string {
        return ['CMD', JSON.stringify(this.commands)].join(' ')
    }
}
