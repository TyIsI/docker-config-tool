import { type Instruction } from '../common/types'

export type ShellInstructionParameters = string[]

export interface IShellInstruction extends Instruction {
    addShell: (shell: string) => this
}
