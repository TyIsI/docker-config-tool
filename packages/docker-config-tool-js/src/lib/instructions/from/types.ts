import { type z } from 'zod'

import { type Instruction } from '../common/types'
import { type zFromInstructionObjectParam, type zFromInstructionParams } from './schema'

export type FromInstructionObjectParam = z.infer<typeof zFromInstructionObjectParam>

export type FromInstructionParams = z.infer<typeof zFromInstructionParams>

export interface IFromInstruction extends Instruction {
    setAs: (nameParam: string) => this
}
