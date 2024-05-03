import { isString, isStringArray } from '../../shared/guards'
import { generateConstructorErrorMessage, generateInvalidArgumentErrorMessage } from '../../shared/utils'
import { type IShellInstruction, type ShellInstructionParameters } from './types'

export class ShellInstruction implements IShellInstruction {
    type = 'instruction' as const

    commands: string[]

    public constructor(...shells: ShellInstructionParameters) {
        if (isStringArray(shells)) {
            this.commands = shells.length === 1 ? shells[0].split(' ') : shells
        } else {
            throw new Error(generateConstructorErrorMessage('SHELL', shells))
        }
    }

    public addShell(shell: string): this {
        if (!isString(shell)) throw new Error(generateInvalidArgumentErrorMessage(`shell`, shell))

        this.commands.push(shell)

        return this
    }

    public toString(): string {
        return ['SHELL', JSON.stringify(this.commands)].join(' ')
    }
}
