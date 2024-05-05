import { type NetworkProtocols } from '../../shared/types'
import {
    zExposeInstructionParam,
    zExposeInstructionParams,
    zExposeInstructionPort,
    zExposeInstructionPortProtoString,
    zExposeInstructionPortProtoTuple,
    zExposeInstructionProto
} from './schema'
import { type ExposeInstructionParam, type ExposeInstructionParams, type ExposePortDefinitionTuple } from './types'

export const isExposeInstructionPortProtoString = (exposes: unknown): exposes is string => {
    return zExposeInstructionPortProtoString.safeParse(exposes).success
}

export const isExposeInstructionParams = (exposes: unknown[]): exposes is ExposeInstructionParams => {
    return zExposeInstructionParams.nonempty().safeParse(exposes).success
}

export const isExposeInstructionParam = (value: unknown): value is ExposeInstructionParam =>
    zExposeInstructionParam.safeParse(value).success

export const isExposeInstructionProto = (value: unknown): value is NetworkProtocols =>
    zExposeInstructionProto.safeParse(value).success

export const isExposeInstructionPortNumber = (value: unknown): value is number =>
    zExposeInstructionPort.safeParse(value).success

export const isExposeInstructionPortProtoTuple = (value: unknown): value is ExposePortDefinitionTuple =>
    zExposeInstructionPortProtoTuple.safeParse(value).success
