import { z } from 'zod'

import {
    zEnvVar,
    zEnvVarArray,
    zFileAccessMode,
    zGIDOpt,
    zLabelVar,
    zLabelVarArray,
    zNetworkProtocolTCP,
    zNetworkProtocolUDP,
    zNetworkProtocols,
    zPartialEnvVar,
    zPartialEnvVarArray,
    zPartialLabelVar,
    zPartialLabelVarArray,
    zROOpt,
    zRWOpt,
    zReadOnlyOpt,
    zReadWriteOpt,
    zRequiredString,
    zStringRecord,
    zUIDGIDObj,
    zUIDGIDTuple,
    zUIDOpt,
    zUnixUserGroupId,
    zUnixUserGroupIdComboString,
    zUnixUserGroupNumericId,
    zUnixUserGroupStringId
} from './schema'
import {
    type EnvVar,
    type EnvVarArray,
    type FileAccessMode,
    type GIDOpt,
    type LabelVar,
    type LabelVarArray,
    type NetworkProtocolTCP,
    type NetworkProtocolUDP,
    type NetworkProtocols,
    type PartialEnvVar,
    type PartialEnvVarArray,
    type PartialLabelVar,
    type PartialLabelVarArray,
    type ROOpt,
    type RWOpt,
    type ReadOnlyOpt,
    type ReadWriteOpt,
    type StringRecord,
    type UIDGIDObj,
    type UIDGIDTuple,
    type UIDOpt,
    type UnixUserGroupId,
    type UnixUserGroupIdComboString,
    type UnixUserGroupNumericId,
    type UnixUserGroupStringId
} from './types'

export const isTrueBoolean = (value: unknown): value is true => z.literal(true).safeParse(value).success

export const isNumberArray = (value: unknown): value is number[] =>
    z.array(z.number()).nonempty().safeParse(value).success

export const isString = (value: unknown): value is string => zRequiredString().safeParse(value).success

export const isStringArray = (value: unknown): value is string[] =>
    z.array(zRequiredString()).nonempty().safeParse(value).success

export const isObjectWithProperty = <T = Record<string, unknown>>(value: unknown, property: string): value is T =>
    z
        .object({
            [property]: z.unknown()
        })
        .required()
        .refine((val) => Object.keys(val).length > 0)
        .safeParse(value).success

export const isEnvVar = (value: unknown): value is EnvVar => zEnvVar.safeParse(value).success

export const isEnvVarArray = (value: unknown): value is EnvVarArray => zEnvVarArray.safeParse(value).success

export const isFileAccessMode = (value: unknown): value is FileAccessMode => zFileAccessMode.safeParse(value).success

export const isGIDOpt = (value: unknown): value is GIDOpt => zGIDOpt.safeParse(value).success

export const isLabelVar = (value: unknown): value is LabelVar => zLabelVar.safeParse(value).success

export const isLabelVarArray = (value: unknown): value is LabelVarArray => zLabelVarArray.safeParse(value).success

export const isNetworkProtocolTCP = (value: unknown): value is NetworkProtocolTCP =>
    zNetworkProtocolTCP.safeParse(value).success

export const isNetworkProtocolUDP = (value: unknown): value is NetworkProtocolUDP =>
    zNetworkProtocolUDP.safeParse(value).success

export const isNetworkProtocols = (value: unknown): value is NetworkProtocols =>
    zNetworkProtocols.safeParse(value).success

export const isPartialEnvVar = (value: unknown): value is PartialEnvVar => zPartialEnvVar.safeParse(value).success

export const isPartialEnvVarArray = (value: unknown): value is PartialEnvVarArray =>
    zPartialEnvVarArray.safeParse(value).success

export const isPartialLabelVar = (value: unknown): value is PartialLabelVar => zPartialLabelVar.safeParse(value).success

export const isPartialLabelVarArray = (value: unknown): value is PartialLabelVarArray =>
    zPartialLabelVarArray.safeParse(value).success

export const isROOpt = (value: unknown): value is ROOpt => zROOpt.safeParse(value).success

export const isRWOpt = (value: unknown): value is RWOpt => zRWOpt.safeParse(value).success

export const isReadOnlyOpt = (value: unknown): value is ReadOnlyOpt => zReadOnlyOpt.safeParse(value).success

export const isReadWriteOpt = (value: unknown): value is ReadWriteOpt => zReadWriteOpt.safeParse(value).success

export const isStringRecord = (value: unknown): value is StringRecord => zStringRecord.safeParse(value).success

export const isUIDGIDObj = (value: unknown): value is UIDGIDObj => zUIDGIDObj.safeParse(value).success

export const isUIDGIDTuple = (value: unknown): value is UIDGIDTuple => zUIDGIDTuple.safeParse(value).success

export const isUIDOpt = (value: unknown): value is UIDOpt => zUIDOpt.safeParse(value).success

export const isUnixUserGroupId = (value: unknown): value is UnixUserGroupId => zUnixUserGroupId.safeParse(value).success

export const isUnixUserGroupIdComboString = (value: unknown): value is UnixUserGroupIdComboString =>
    zUnixUserGroupIdComboString.safeParse(value).success

export const isUnixUserGroupNumericId = (value: unknown): value is UnixUserGroupNumericId =>
    zUnixUserGroupNumericId.safeParse(value).success

export const isUnixUserGroupStringId = (value: unknown): value is UnixUserGroupStringId =>
    zUnixUserGroupStringId.safeParse(value).success
