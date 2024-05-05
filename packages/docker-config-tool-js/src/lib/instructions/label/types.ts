import { type Instruction } from '../common/types'

export type LabelInstructionParamsObject = Record<string, string>

export type LabelInstructionParams = string | string[] | LabelInstructionParamsObject

export interface ILabelInstruction extends Instruction {
    addLabel: (labelParam: string) => void
}
