import { type BuildableInstruction } from '../../common/classes/instructions/types'

export type VolumeInstructionParams = string[]

export interface IVolumeInstruction extends BuildableInstruction {
    instruction: 'VOLUME'
}
