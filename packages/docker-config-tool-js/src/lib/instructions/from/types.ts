import { type z } from 'zod'

import { type GenericInstruction } from '../../common/classes/instructions/types'
import { type zFromInstructionObjectParam, type zFromInstructionParams } from './schema'

export type FromInstructionObjectParam = z.infer<typeof zFromInstructionObjectParam>

export type FromInstructionParams = z.infer<typeof zFromInstructionParams>

export interface IFromInstruction extends GenericInstruction {
    instruction: 'FROM'

    setAs: (nameParam: string) => this
}
