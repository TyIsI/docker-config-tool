import { type Instruction } from '../common/types'

export type EntryPointInstructionParams = string[]

export interface IEntryPointInstruction extends Instruction {
    addEntrypointArg: (entrypoint: string) => IEntryPointInstruction
}
