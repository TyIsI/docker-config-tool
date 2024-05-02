import { zUIDGIDObj, zUIDGIDTuple } from '../../shared/schema'
import { type UnixUserGroupIdOpt } from '../../shared/types'
import { zUserInstructionParameters } from './schema'
import { type UserInstructionParameters } from './types'

export const isUserInstructionParameters = (value: unknown): value is UserInstructionParameters =>
    zUserInstructionParameters.safeParse(value).success

export const isUserInstructionParamObject = (value: unknown): value is UnixUserGroupIdOpt =>
    zUIDGIDObj.safeParse(value).success

export const isUserInstructionParamTuple = (value: unknown): value is Array<string | number> =>
    zUIDGIDTuple.safeParse(value).success
