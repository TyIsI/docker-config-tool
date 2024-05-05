import { isString, isStringArray } from '../../shared/guards'
import { generateConstructorErrorMessage, generateInvalidArgumentErrorMessage } from '../../shared/utils'
import { type IShellInstruction, type ShellInstructionParams } from './types'

export class ShellInstruction implements IShellInstruction {
    type = 'instruction' as const

    commands: string[]

    public constructor(...shellParams: ShellInstructionParams) {
        if (isStringArray(shellParams)) {
            this.commands = shellParams.length === 1 ? shellParams[0].split(' ') : shellParams
        } else {
            throw new Error(generateConstructorErrorMessage('SHELL', shellParams))
        }
    }

    public addShell(shellParam: string): this {
        if (!isString(shellParam)) throw new Error(generateInvalidArgumentErrorMessage(`shell`, shellParam))

        this.commands.push(shellParam)

        return this
    }

    public toString(): string {
        return ['SHELL', JSON.stringify(this.commands)].join(' ')
    }
}
