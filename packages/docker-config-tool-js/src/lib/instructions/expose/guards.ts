import { type NetworkProtocols } from '../../shared/types'
import {
    zExposeInstructionPortProtoString,
    zExposeInstructionParameters,
    zExposeInstructionParameter,
    zExposeInstructionProto,
    zExposeInstructionPort,
    zExposeInstructionPortProtoTuple
} from './schema'
import {
    type ExposeInstructionParameters,
    type ExposeInstructionParameter,
    type ExposePortDefinitionTuple
} from './types'

export const isExposeInstructionPortProtoString = (exposes: unknown): exposes is string => {
    return zExposeInstructionPortProtoString.safeParse(exposes).success
}

export const isExposeInstructionParameters = (exposes: unknown[]): exposes is ExposeInstructionParameters => {
    return zExposeInstructionParameters.nonempty().safeParse(exposes).success
}

export const isExposeInstructionParameter = (value: unknown): value is ExposeInstructionParameter =>
    zExposeInstructionParameter.safeParse(value).success

export const isExposeInstructionProto = (value: unknown): value is NetworkProtocols =>
    zExposeInstructionProto.safeParse(value).success

export const isExposeInstructionPortNumber = (value: unknown): value is number =>
    zExposeInstructionPort.safeParse(value).success

export const isExposeInstructionPortProtoTuple = (value: unknown): value is ExposePortDefinitionTuple =>
    zExposeInstructionPortProtoTuple.safeParse(value).success
