import { type Instruction } from '../common/types'

export type EntryPointInstructionParameters = string[]

export interface IEntryPointInstruction extends Instruction {
    addEntrypointArg: (entrypoint: string) => IEntryPointInstruction
}
