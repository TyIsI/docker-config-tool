import { type z } from 'zod'

import { type Instruction } from '../common/types'
import { type zUserInstructionParameters, type zUserInstructionPrimaryParameter } from './schema'

export type UserInstructionPrimaryParameter = z.input<typeof zUserInstructionPrimaryParameter>

export type UserInstructionParameters = z.input<typeof zUserInstructionParameters>

export interface IUserInstruction extends Instruction {}
