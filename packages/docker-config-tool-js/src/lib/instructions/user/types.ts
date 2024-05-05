import { type z } from 'zod'

import { type Instruction } from '../common/types'
import { type zUserInstructionParams, type zUserInstructionPrimaryParam } from './schema'

export type UserInstructionPrimaryParam = z.input<typeof zUserInstructionPrimaryParam>

export type UserInstructionParams = z.input<typeof zUserInstructionParams>

export interface IUserInstruction extends Instruction {}
