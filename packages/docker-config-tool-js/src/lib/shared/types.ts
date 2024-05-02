import { type z } from 'zod'

import {
    type zEnvVar,
    type zEnvVarArray,
    type zFileAccessMode,
    type zGIDOpt,
    type zLabelVar,
    type zLabelVarArray,
    type zNetworkProtocolTCP,
    type zNetworkProtocolUDP,
    type zNetworkProtocols,
    type zPartialEnvVar,
    type zPartialEnvVarArray,
    type zPartialLabelVar,
    type zPartialLabelVarArray,
    type zROOpt,
    type zRWOpt,
    type zReadOnlyOpt,
    type zReadWriteOpt,
    type zStringRecord,
    type zUIDGIDObj,
    type zUIDGIDTuple,
    type zUIDOpt,
    type zUnixUserGroupId,
    type zUnixUserGroupIdComboString,
    type zUnixUserGroupNumericId,
    type zUnixUserGroupStringId
} from './schema'

export interface UnixUserGroupIdOpt {
    uid: UnixUserGroupId
    gid?: UnixUserGroupId
}

export type ResultTuple<T = unknown> = [true, T] | [false, string[]]
export type ResultOptionalTuple<T = unknown> = [true, T | undefined] | [false, string[]]

export type EnvVar = z.infer<typeof zEnvVar>
export type EnvVarArray = z.infer<typeof zEnvVarArray>
export type FileAccessMode = z.input<typeof zFileAccessMode>
export type GIDOpt = z.infer<typeof zGIDOpt>
export type LabelVar = z.infer<typeof zLabelVar>
export type LabelVarArray = z.infer<typeof zLabelVarArray>
export type NetworkProtocolTCP = z.infer<typeof zNetworkProtocolTCP>
export type NetworkProtocolUDP = z.infer<typeof zNetworkProtocolUDP>
export type NetworkProtocols = z.infer<typeof zNetworkProtocols>
export type PartialEnvVar = z.infer<typeof zPartialEnvVar>
export type PartialEnvVarArray = z.infer<typeof zPartialEnvVarArray>
export type PartialLabelVar = z.infer<typeof zPartialLabelVar>
export type PartialLabelVarArray = z.infer<typeof zPartialLabelVarArray>
export type ROOpt = z.infer<typeof zROOpt>
export type RWOpt = z.infer<typeof zRWOpt>
export type ReadOnlyOpt = z.infer<typeof zReadOnlyOpt>
export type ReadWriteOpt = z.infer<typeof zReadWriteOpt>
export type RequiredString = string // NOSONAR
export type StringRecord = z.infer<typeof zStringRecord>
export type UIDGIDObj = z.infer<typeof zUIDGIDObj>
export type UIDGIDTuple = z.infer<typeof zUIDGIDTuple>
export type UIDOpt = z.infer<typeof zUIDOpt>
export type UnixUserGroupId = z.infer<typeof zUnixUserGroupId>
export type UnixUserGroupIdComboString = z.infer<typeof zUnixUserGroupIdComboString>
export type UnixUserGroupNumericId = z.infer<typeof zUnixUserGroupNumericId>
export type UnixUserGroupStringId = z.infer<typeof zUnixUserGroupStringId>
