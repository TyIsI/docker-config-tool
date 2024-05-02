import { type Instruction } from '../common/types'

export type EnvInstructionParametersObject = Record<string, string>

export type EnvInstructionParameters = string | string[] | EnvInstructionParametersObject

export interface IEnvInstruction extends Instruction {}
