import { AbstractBuildableInstruction } from '../../common/classes/instructions/buildable/class'
import { isString, isStringArray } from '../../shared/guards'
import { generateConstructorErrorMessage, generateInvalidArgumentErrorMessage } from '../../shared/utils'
import { type IShellInstruction, type ShellInstructionParams } from './types'

export class ShellInstruction extends AbstractBuildableInstruction implements IShellInstruction {
    type = 'instruction' as const

    instruction = 'SHELL' as const

    commands: string[]

    public constructor(...shellParams: ShellInstructionParams) {
        super()

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
        const output: string[] = [this.instruction]

        if (this.onBuild) output.unshift('ONBUILD')

        output.push(JSON.stringify(this.commands))

        return output.join(' ')
    }
}
