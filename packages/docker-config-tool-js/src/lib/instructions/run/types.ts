import { type z } from 'zod'

import { type Instruction } from '../common/types'
import {
    type zRunInstructionArgsObject,
    type zRunInstructionBooleanFields,
    type zRunInstructionCacheSharingTypes,
    type zRunInstructionMountType,
    type zRunInstructionMountTypeBind,
    type zRunInstructionMountTypeBindCommon,
    type zRunInstructionMountTypeBindRW,
    type zRunInstructionMountTypeBindReadWrite,
    type zRunInstructionMountTypeCache,
    type zRunInstructionMountTypeCacheCommon,
    type zRunInstructionMountTypeCacheRO,
    type zRunInstructionMountTypeCacheReadOnly,
    type zRunInstructionMountTypeSSH,
    type zRunInstructionMountTypeSecret,
    type zRunInstructionMountTypeTmpFS,
    type zRunInstructionNetworkType,
    type zRunInstructionParameters,
    type zRunInstructionSecurityType,
    type zRunInstructions
} from './schema'

export type RunInstructionArgsObject = z.input<typeof zRunInstructionArgsObject>
export type RunInstructionBooleanFields = z.input<typeof zRunInstructionBooleanFields>
export type RunInstructionCacheSharingTypes = z.input<typeof zRunInstructionCacheSharingTypes>
export type RunInstructionMountTypeBindCommon = z.input<typeof zRunInstructionMountTypeBindCommon>
export type RunInstructionMountTypeBindReadWrite = z.input<typeof zRunInstructionMountTypeBindReadWrite>
export type RunInstructionMountTypeBindRW = z.input<typeof zRunInstructionMountTypeBindRW>
export type RunInstructionMountTypeBind = z.input<typeof zRunInstructionMountTypeBind>
export type RunInstructionMountTypeCacheCommon = z.input<typeof zRunInstructionMountTypeCacheCommon>
export type RunInstructionMountTypeCacheReadOnly = z.input<typeof zRunInstructionMountTypeCacheReadOnly>
export type RunInstructionMountTypeCacheRO = z.input<typeof zRunInstructionMountTypeCacheRO>
export type RunInstructionMountTypeCache = z.input<typeof zRunInstructionMountTypeCache>
export type RunInstructionMountTypeSecret = z.input<typeof zRunInstructionMountTypeSecret>
export type RunInstructionMountTypeSSH = z.input<typeof zRunInstructionMountTypeSSH>
export type RunInstructionMountTypeTmpFS = z.input<typeof zRunInstructionMountTypeTmpFS>
export type RunInstructionMountType = z.input<typeof zRunInstructionMountType>
export type RunInstructionNetworkType = z.input<typeof zRunInstructionNetworkType>
export type RunInstructionParameters = z.input<typeof zRunInstructionParameters>
export type RunInstructionSecurityType = z.input<typeof zRunInstructionSecurityType>
export type RunInstructions = z.input<typeof zRunInstructions>

export interface IRunInstruction extends Instruction {
    setMount: (mount: RunInstructionMountType) => void

    setNetwork: (network: RunInstructionNetworkType) => void

    setSecurity: (security: RunInstructionSecurityType) => void
}
