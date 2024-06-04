import { type BuildableInstruction } from '../../common/classes/instructions/types'

export type LabelInstructionParamsObject = Record<string, string>

export type LabelInstructionParams = string | string[] | LabelInstructionParamsObject

export interface ILabelInstruction extends BuildableInstruction {
    instruction: 'LABEL'

    addLabel: (labelParam: string) => void
}
