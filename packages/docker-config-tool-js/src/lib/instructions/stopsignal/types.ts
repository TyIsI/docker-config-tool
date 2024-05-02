import { type z } from 'zod'

import { type zStopSignalNumber, type zStopSignalString } from './schema'
import { type Instruction } from '../common/types'

export type StopSignalInstructionParameters = string | number

export type StopSignalString = z.infer<typeof zStopSignalString>
export type StopSignalNumber = z.infer<typeof zStopSignalNumber>

export interface IStopSignalInstruction extends Instruction {}
