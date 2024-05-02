import { type Instruction } from '../common/types'

export type CmdInstructionParameters = string[]

export interface ICmdInstruction extends Instruction {
    addCmd: (cmd: string) => ICmdInstruction
}
