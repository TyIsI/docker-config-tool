import { type Instruction } from '../common/types'

export interface ArgInstructionParametersObject {
    name: string
    value?: string
}

export type ArgInstructionParameters = string | ArgInstructionParametersObject

export interface IArgInstruction extends Instruction {}
