import { zExposeInstructionPortProtoObject } from './schema'
import {
    isExposeInstructionParameter,
    isExposeInstructionPortNumber,
    isExposeInstructionPortProtoString,
    isExposeInstructionProto,
    isExposeInstructionPortProtoTuple
} from './guards'
import { type ExposePortDefinition } from './types'

export const coerceExposeDefinition = (value: unknown): ExposePortDefinition => {
    if (!isExposeInstructionParameter(value)) throw new Error('non-coerceable value')

    let port: ExposePortDefinition['port'] = 0
    let proto: ExposePortDefinition['proto'] = 'tcp'

    if (isExposeInstructionPortNumber(value)) {
        port = Number(value)
    } else if (isExposeInstructionPortProtoString(value)) {
        const splitVal = value.split('/')

        port = Number(splitVal[0])

        if (isExposeInstructionProto(splitVal[1])) proto = splitVal[1]
    } else if (isExposeInstructionPortProtoTuple(value)) {
        port = Number(value[0])
        proto = value[1]
    } else if (typeof value === 'object' && value != null && !Array.isArray(value)) {
        const result = zExposeInstructionPortProtoObject.safeParse(value)

        if (result.success) {
            port = result.data.port

            if (result.data.proto != null) proto = result.data.proto
        }
    }

    return { port, proto }
}
