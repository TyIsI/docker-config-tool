import { zUIDGIDObj, zUIDGIDTuple } from '../../shared/schema'
import { type UnixUserGroupIdOpt } from '../../shared/types'
import { zUserInstructionParams } from './schema'
import { type UserInstructionParams } from './types'

export const isUserInstructionParams = (value: unknown): value is UserInstructionParams =>
    zUserInstructionParams.safeParse(value).success

export const isUserInstructionParamObject = (value: unknown): value is UnixUserGroupIdOpt =>
    zUIDGIDObj.safeParse(value).success

export const isUserInstructionParamTuple = (value: unknown): value is Array<string | number> =>
    zUIDGIDTuple.safeParse(value).success
