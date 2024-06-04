import { type z } from 'zod'

import { type zStopSignalNumber, type zStopSignalString } from './schema'
import { type BuildableInstruction } from '../../common/classes/instructions/types'

export type StopSignalInstructionParams = string | number

export type StopSignalString = z.infer<typeof zStopSignalString>
export type StopSignalNumber = z.infer<typeof zStopSignalNumber>

export interface IStopSignalInstruction extends BuildableInstruction {
    instruction: 'STOPSIGNAL'
}
