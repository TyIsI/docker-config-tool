import { type Instruction } from '../common/types'

export interface ArgInstructionParamsObject {
    name: string
    value?: string
}

export type ArgInstructionParams = string | ArgInstructionParamsObject

export interface IArgInstruction extends Instruction {}
