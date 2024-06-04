import { type z } from 'zod'
import { type zInstruction } from './schema'

export * from './buildable/types'
export * from './generic/types'

export type Instruction = z.infer<typeof zInstruction>

export type Instructions = Instruction[]
