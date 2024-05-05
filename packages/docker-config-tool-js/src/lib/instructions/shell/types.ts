import { type Instruction } from '../common/types'

export type ShellInstructionParams = string[]

export interface IShellInstruction extends Instruction {
    addShell: (shell: string) => this
}
