import { type z } from 'zod'
import { type zBaseInstruction, type zValidInstructions } from './schema'

export interface BaseInstruction extends z.infer<typeof zBaseInstruction> {}

export type ValidInstructions = z.infer<typeof zValidInstructions>
