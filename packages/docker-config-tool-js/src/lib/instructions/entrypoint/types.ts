import { type BuildableInstruction } from '../../common/classes/instructions/types'

export type EntryPointInstructionParams = string[]

export interface IEntryPointInstruction extends BuildableInstruction {
    instruction: 'ENTRYPOINT'

    addEntrypointArg: (entrypoint: string) => IEntryPointInstruction
}
