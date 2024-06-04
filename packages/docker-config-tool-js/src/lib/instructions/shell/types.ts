import { type BuildableInstruction } from '../../common/classes/instructions/types'

export type ShellInstructionParams = string[]

export interface IShellInstruction extends BuildableInstruction {
    instruction: 'SHELL'

    addShell: (shell: string) => this
}
