import { type z } from 'zod'

import { type Instruction } from '../common/types'
import {
    type zFromInstructionObjectParam,
    type zFromInstructionParams,
    type zFromInstructionStringFromParam
} from './schema'

export type FromInstructionParamObject = z.infer<typeof zFromInstructionObjectParam>

export type FromInstructionParams = z.infer<typeof zFromInstructionParams>

export type FromInstructionStringFromParam = z.infer<typeof zFromInstructionStringFromParam>

export interface IFromInstruction extends Instruction {
    setAs: (name: string) => this
}
