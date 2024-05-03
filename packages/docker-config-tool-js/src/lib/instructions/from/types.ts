import { type z } from 'zod'

import { type Instruction } from '../common/types'
import {
    type zFromInstructionObjectParameter as zFromInstructionObject,
    type zFromInstructionParameters,
    type zFromInstructionStringFromParameter as zFromInstructionStringFrom
} from './schema'

export type FromInstructionParameterObject = z.infer<typeof zFromInstructionObject>

export type FromInstructionParameters = z.infer<typeof zFromInstructionParameters>

export type FromInstructionStringFromParameter = z.infer<typeof zFromInstructionStringFrom>

export interface IFromInstruction extends Instruction {
    setAs: (name: string) => this
}
