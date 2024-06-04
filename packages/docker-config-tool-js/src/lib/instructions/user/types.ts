import { type z } from 'zod'

import { type BuildableInstruction } from '../../common/classes/instructions/types'
import { type zUserInstructionParams, type zUserInstructionPrimaryParam } from './schema'

export type UserInstructionPrimaryParam = z.input<typeof zUserInstructionPrimaryParam>

export type UserInstructionParams = z.input<typeof zUserInstructionParams>

export interface IUserInstruction extends BuildableInstruction {
    instruction: 'USER'
}
