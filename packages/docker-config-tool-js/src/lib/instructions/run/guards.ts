import {
    zRunInstructionBooleanFields,
    zRunInstructionCacheSharingTypes,
    zRunInstructionMountType,
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
    zRunInstructionMountTypeTmpFS,
    zRunInstructionNetworkType,
    zRunInstructionParams,
    zRunInstructionParamsObject,
    zRunInstructionSecurityType,
    zRunInstructions
} from './schema'
import {
    type RunInstructionBooleanFields,
    type RunInstructionCacheSharingTypes,
    type RunInstructionMountType,
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
    type RunInstructionMountTypeTmpFS,
    type RunInstructionNetworkType,
    type RunInstructionParams,
    type RunInstructionParamsObject,
    type RunInstructionSecurityType,
    type RunInstructions
} from './types'

export const isRunInstructionParamsObject = (value: unknown): value is RunInstructionParamsObject =>
    zRunInstructionParamsObject.safeParse(value).success

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

export const isRunInstructionMountParam = (value: unknown): value is RunInstructionMountType =>
    zRunInstructionMountType.safeParse(value).success

export const isRunInstructionNetworkParam = (value: unknown): value is RunInstructionNetworkType =>
    zRunInstructionNetworkType.safeParse(value).success

export const isRunInstructionParams = (value: unknown): value is RunInstructionParams =>
    zRunInstructionParams.safeParse(value).success

export const isRunInstructionSecurityParam = (value: unknown): value is RunInstructionSecurityType =>
    zRunInstructionSecurityType.safeParse(value).success

export const isRunInstructions = (value: unknown): value is RunInstructions => zRunInstructions.safeParse(value).success
