import { isString, isStringArray } from '../../shared/guards'
import { generateConstructorErrorMessage } from '../../shared/utils'
import { type CmdInstructionParameters, type ICmdInstruction } from './types'

export class CmdInstruction implements ICmdInstruction {
    type = 'instruction' as const

    commands: string[] = []

    public constructor(...cmds: CmdInstructionParameters) {
        if (!isStringArray(cmds)) throw new Error(generateConstructorErrorMessage('CMD', cmds))

        this.commands = cmds.length === 1 ? cmds[0].split(' ') : cmds
    }

    public addCmd(cmd: string): this {
        if (!isString(cmd)) throw new Error(`Invalid cmd argument: ${typeof cmd} ${JSON.stringify(cmd)}`)

        this.commands.push(cmd)

        return this
    }

    public toString(): string {
        return ['CMD', JSON.stringify(this.commands)].join(' ')
    }
}
