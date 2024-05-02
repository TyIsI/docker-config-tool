import {
    zCopyInstructionChmod,
    zCopyInstructionChown,
    zCopyInstructionDestination,
    zCopyInstructionExclude,
    zCopyInstructionExcludes,
    zCopyInstructionFrom,
    zCopyInstructionLink,
    zCopyInstructionParamObject,
    zCopyInstructionParams,
    zCopyInstructionParents,
    zCopyInstructionSources
} from './schema'
import {
    type CopyInstructionChmod,
    type CopyInstructionChown,
    type CopyInstructionDestination,
    type CopyInstructionExclude,
    type CopyInstructionExcludes,
    type CopyInstructionFrom,
    type CopyInstructionLink,
    type CopyInstructionParamObject,
    type CopyInstructionParams,
    type CopyInstructionParents,
    type CopyInstructionSources
} from './types'

export const isCopyInstructionSources = (value: unknown): value is CopyInstructionSources =>
    zCopyInstructionSources.safeParse(value).success

export const isCopyInstructionDestination = (value: unknown): value is CopyInstructionDestination =>
    zCopyInstructionDestination.safeParse(value).success

export const isCopyInstructionFrom = (value: unknown): value is CopyInstructionFrom =>
    zCopyInstructionFrom.safeParse(value).success

export const isCopyInstructionChown = (value: unknown): value is CopyInstructionChown =>
    zCopyInstructionChown.safeParse(value).success

export const isCopyInstructionChmod = (value: unknown): value is CopyInstructionChmod =>
    zCopyInstructionChmod.safeParse(value).success

export const isCopyInstructionLink = (value: unknown): value is CopyInstructionLink =>
    zCopyInstructionLink.safeParse(value).success

export const isCopyInstructionParents = (value: unknown): value is CopyInstructionParents =>
    zCopyInstructionParents.safeParse(value).success

export const isCopyInstructionExclude = (value: unknown): value is CopyInstructionExclude =>
    zCopyInstructionExclude.safeParse(value).success

export const isCopyInstructionExcludes = (value: unknown): value is CopyInstructionExcludes =>
    zCopyInstructionExcludes.safeParse(value).success

export const isCopyInstructionParamObject = (value: unknown): value is CopyInstructionParamObject =>
    zCopyInstructionParamObject.safeParse(value).success

export const isCopyInstructionParams = (value: unknown): value is CopyInstructionParams =>
    zCopyInstructionParams.safeParse(value).success
