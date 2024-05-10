import { z } from 'zod'

import {
    zDockerImageReference,
    zFileAccessMode,
    zROOpt,
    zRWOpt,
    zReadOnlyOpt,
    zReadWriteOpt,
    zRequiredString,
    zUnixUserGroupNumericId
} from '../../shared/schema'
import { zStage } from '../../stage/schema'

export const zRunInstructionBooleanFields = z.union([
    z.literal('rw'),
    z.literal('readwrite'),
    z.literal('ro'),
    z.literal('readonly'),
    z.literal('required')
])

export const zRunInstructionCacheSharingTypes = z.union([
    z.literal('shared'),
    z.literal('private'),
    z.literal('locked')
])

export const zRunInstructions = z.union([zRequiredString(), z.array(zRequiredString()).nonempty()])

export const zRunInstructionMountFrom = z.union([zDockerImageReference, zStage])

export const zRunInstructionMountTypeBindCommon = z.object({
    type: z.literal('bind'),
    target: z.string().min(3),
    from: zRunInstructionMountFrom.optional(),
    source: z.string().min(3).optional()
})

export const zRunInstructionMountTypeBindReadWrite = zRunInstructionMountTypeBindCommon.merge(zReadWriteOpt)

export const zRunInstructionMountTypeBindRW = zRunInstructionMountTypeBindCommon.merge(zRWOpt)

export const zRunInstructionMountTypeBind = z.union([
    zRunInstructionMountTypeBindReadWrite.strict(),
    zRunInstructionMountTypeBindRW.strict(),
    zRunInstructionMountTypeBindCommon.strict()
])

export const zRunInstructionMountTypeCacheCommon = z.object({
    type: z.literal('cache'),
    target: zRequiredString(),
    id: z.string().optional(),
    sharing: zRunInstructionCacheSharingTypes.optional(),
    from: zRunInstructionMountFrom.optional(),
    source: zRequiredString().optional(),
    mode: zFileAccessMode.optional(),
    uid: zUnixUserGroupNumericId.optional(),
    gid: zUnixUserGroupNumericId.optional()
})

export const zRunInstructionMountTypeCacheReadOnly = zRunInstructionMountTypeCacheCommon.merge(zReadOnlyOpt)

export const zRunInstructionMountTypeCacheRO = zRunInstructionMountTypeCacheCommon.merge(zROOpt)

export const zRunInstructionMountTypeCache = z.union([
    zRunInstructionMountTypeCacheReadOnly.strict(),
    zRunInstructionMountTypeCacheRO.strict(),
    zRunInstructionMountTypeCacheCommon.strict()
])

export const zRunInstructionMountTypeSecret = z.object({
    type: z.literal('secret'),
    id: zRequiredString(),
    target: zRequiredString().optional(),
    required: z.boolean().optional(),
    mode: zFileAccessMode.optional(),
    uid: zUnixUserGroupNumericId.optional(),
    gid: zUnixUserGroupNumericId.optional()
})

export const zRunInstructionMountTypeSSH = z.object({
    type: z.literal('ssh'),
    id: zRequiredString().optional(),
    target: zRequiredString().optional(),
    required: z.boolean().optional(),
    mode: zFileAccessMode.optional(),
    uid: zUnixUserGroupNumericId.optional(),
    gid: zUnixUserGroupNumericId.optional()
})

export const zRunInstructionMountTypeTmpFS = z.object({
    type: z.literal('tmpfs'),
    target: z.string(),
    size: z.number().min(1)
})

export const zRunInstructionMountType = z.union([
    zRunInstructionMountTypeBindReadWrite.strict(),
    zRunInstructionMountTypeBindRW.strict(),
    zRunInstructionMountTypeBindCommon.strict(),
    zRunInstructionMountTypeCacheReadOnly.strict(),
    zRunInstructionMountTypeCacheRO.strict(),
    zRunInstructionMountTypeCacheCommon.strict(),
    zRunInstructionMountTypeSSH.strict(),
    zRunInstructionMountTypeSecret.strict(),
    zRunInstructionMountTypeTmpFS.strict()
])

export const zRunInstructionNetworkType = z.union([z.literal('default'), z.literal('none'), z.literal('host')])

export const zRunInstructionSecurityType = z.union([z.literal('sandbox'), z.literal('insecure')])

export const zRunInstructionParamsObject = z.object({
    commands: zRunInstructions,
    mount: zRunInstructionMountType.optional(),
    network: zRunInstructionNetworkType.optional(),
    security: zRunInstructionSecurityType.optional()
})

export const zRunInstructionParams = z.union([
    z.tuple([zRequiredString()]),
    z.tuple([zRequiredString()]).rest(zRequiredString()),
    z.tuple([z.array(zRequiredString()).nonempty()]),
    z.tuple([zRunInstructionParamsObject])
])
