import {
    zAddInstructionParamObject,
    zAddInstructionParams,
    zAddInstructionSources,
    zAddInstructionKeepGitDir,
    zAddInstructionChecksum,
    zAddInstructionChown,
    zAddInstructionChmod,
    zAddInstructionLink
} from './schema'
import { type AddInstructionParamObject, type AddInstructionParams } from './types'

export const isAddInstructionParamObject = (value: unknown): value is AddInstructionParamObject => {
    return zAddInstructionParamObject.safeParse(value).success
}

export const isAddInstructionParams = (value: unknown[]): value is AddInstructionParams =>
    zAddInstructionParams.safeParse(value).success

export const isAddInstructionSources = (value: unknown): value is string | string[] =>
    zAddInstructionSources.safeParse(value).success

export const isAddInstructionKeepGitDir = (value: unknown): value is boolean =>
    zAddInstructionKeepGitDir.safeParse(value).success

export const isAddInstructionChecksum = (value: unknown): value is string =>
    zAddInstructionChecksum.safeParse(value).success

export const isAddInstructionChown = (value: unknown): value is string => zAddInstructionChown.safeParse(value).success
export const isAddInstructionChmod = (value: unknown): value is number => zAddInstructionChmod.safeParse(value).success
export const isAddInstructionLink = (value: unknown): value is boolean => zAddInstructionLink.safeParse(value).success
