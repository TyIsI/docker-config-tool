import { type Instruction } from '../common/types'

export type EnvInstructionParamsObject = Record<string, string>

export type EnvInstructionParams = string | string[] | EnvInstructionParamsObject

export interface IEnvInstruction extends Instruction {}
