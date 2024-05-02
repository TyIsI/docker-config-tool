import { type Instruction } from '../common/types'

export type LabelInstructionArgsOptionsObject = Record<string, string>

export type LabelInstructionArgs = string | string[] | LabelInstructionArgsOptionsObject

export interface ILabelInstruction extends Instruction {
    addLabel: (labelParam: string) => void
}
