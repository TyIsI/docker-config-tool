import { type BuildableInstruction } from '../../common/classes/instructions/buildable/types'

export interface ArgInstructionParamsObject {
    name: string
    value?: string
}

export type ArgInstructionParams = string | ArgInstructionParamsObject

export interface IArgInstruction extends BuildableInstruction {
    instruction: 'ARG'
}
