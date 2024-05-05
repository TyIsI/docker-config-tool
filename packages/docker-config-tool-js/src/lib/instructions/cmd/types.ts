import { type Instruction } from '../common/types'

export type CmdInstructionParams = string[]

export interface ICmdInstruction extends Instruction {
    addCmd: (cmd: string) => ICmdInstruction
}
