import { zInstruction } from './schema'
import { type Instruction } from './types'

export const isInstruction = (value: unknown): value is Instruction => zInstruction.safeParse(value).success
