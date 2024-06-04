import { type BuildableInstruction } from '../../common/classes/instructions/types'

export type EnvInstructionParamsObject = Record<string, string>

export type EnvInstructionParams = string | string[] | EnvInstructionParamsObject

export interface IEnvInstruction extends BuildableInstruction {
    instruction: 'ENV'
}
