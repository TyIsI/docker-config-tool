import {
    zRunInstructionArgsObject,
    zRunInstructionBooleanFields,
    zRunInstructionNetworkType,
    zRunInstructionSecurityType,
    zRunInstructions,
    zRunInstructionParameters,
    zRunInstructionMountType,
    zRunInstructionCacheSharingTypes,
    zRunInstructionMountTypeBind,
    zRunInstructionMountTypeBindCommon,
    zRunInstructionMountTypeBindRW,
    zRunInstructionMountTypeBindReadWrite,
    zRunInstructionMountTypeCache,
    zRunInstructionMountTypeCacheCommon,
    zRunInstructionMountTypeCacheRO,
    zRunInstructionMountTypeCacheReadOnly,
    zRunInstructionMountTypeSSH,
    zRunInstructionMountTypeSecret,
    zRunInstructionMountTypeTmpFS
} from './schema'
import {
    type RunInstructionArgsObject,
    type RunInstructionNetworkType,
    type RunInstructionSecurityType,
    type RunInstructions,
    type RunInstructionParameters,
    type RunInstructionBooleanFields,
    type RunInstructionMountType,
    type RunInstructionCacheSharingTypes,
    type RunInstructionMountTypeBind,
    type RunInstructionMountTypeBindCommon,
    type RunInstructionMountTypeBindRW,
    type RunInstructionMountTypeBindReadWrite,
    type RunInstructionMountTypeCache,
    type RunInstructionMountTypeCacheCommon,
    type RunInstructionMountTypeCacheRO,
    type RunInstructionMountTypeCacheReadOnly,
    type RunInstructionMountTypeSSH,
    type RunInstructionMountTypeSecret,
    type RunInstructionMountTypeTmpFS
} from './types'

export const isRunInstructionArgsObject = (value: unknown): value is RunInstructionArgsObject =>
    zRunInstructionArgsObject.safeParse(value).success

export const isRunInstructionBooleanFields = (value: unknown): value is RunInstructionBooleanFields =>
    zRunInstructionBooleanFields.safeParse(value).success

export const isRunInstructionCacheSharingTypes = (value: unknown): value is RunInstructionCacheSharingTypes =>
    zRunInstructionCacheSharingTypes.safeParse(value).success

export const isRunInstructionMountTypeBindCommon = (value: unknown): value is RunInstructionMountTypeBindCommon =>
    zRunInstructionMountTypeBindCommon.safeParse(value).success

export const isRunInstructionMountTypeBindReadWrite = (value: unknown): value is RunInstructionMountTypeBindReadWrite =>
    zRunInstructionMountTypeBindReadWrite.safeParse(value).success

export const isRunInstructionMountTypeBindRW = (value: unknown): value is RunInstructionMountTypeBindRW =>
    zRunInstructionMountTypeBindRW.safeParse(value).success

export const isRunInstructionMountTypeBind = (value: unknown): value is RunInstructionMountTypeBind =>
    zRunInstructionMountTypeBind.safeParse(value).success

export const isRunInstructionMountTypeCacheCommon = (value: unknown): value is RunInstructionMountTypeCacheCommon =>
    zRunInstructionMountTypeCacheCommon.safeParse(value).success

export const isRunInstructionMountTypeCacheReadOnly = (value: unknown): value is RunInstructionMountTypeCacheReadOnly =>
    zRunInstructionMountTypeCacheReadOnly.safeParse(value).success

export const isRunInstructionMountTypeCacheRO = (value: unknown): value is RunInstructionMountTypeCacheRO =>
    zRunInstructionMountTypeCacheRO.safeParse(value).success

export const isRunInstructionMountTypeCache = (value: unknown): value is RunInstructionMountTypeCache =>
    zRunInstructionMountTypeCache.safeParse(value).success

export const isRunInstructionMountTypeSecret = (value: unknown): value is RunInstructionMountTypeSecret =>
    zRunInstructionMountTypeSecret.safeParse(value).success

export const isRunInstructionMountTypeSSH = (value: unknown): value is RunInstructionMountTypeSSH =>
    zRunInstructionMountTypeSSH.safeParse(value).success

export const isRunInstructionMountTypeTmpFS = (value: unknown): value is RunInstructionMountTypeTmpFS =>
    zRunInstructionMountTypeTmpFS.safeParse(value).success

export const isRunInstructionMountRunArg = (value: unknown): value is RunInstructionMountType =>
    zRunInstructionMountType.safeParse(value).success

export const isRunInstructionNetworkRunArg = (value: unknown): value is RunInstructionNetworkType =>
    zRunInstructionNetworkType.safeParse(value).success

export const isRunInstructionParameters = (value: unknown): value is RunInstructionParameters =>
    zRunInstructionParameters.safeParse(value).success

export const isRunInstructionSecurityRunArg = (value: unknown): value is RunInstructionSecurityType =>
    zRunInstructionSecurityType.safeParse(value).success

export const isRunInstructions = (value: unknown): value is RunInstructions => zRunInstructions.safeParse(value).success
