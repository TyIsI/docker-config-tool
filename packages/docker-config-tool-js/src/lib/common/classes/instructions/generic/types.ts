import { type z } from 'zod'
import { type zGenericInstruction } from './schema'

export type GenericInstruction = z.infer<typeof zGenericInstruction>
