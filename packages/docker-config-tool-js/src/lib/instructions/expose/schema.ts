import { z } from 'zod'

export const zExposeInstructionPort = z.coerce.number().min(1).max(65535)

export const zExposeInstructionProto = z.union([z.literal('tcp'), z.literal('udp')])

export const zExposeInstructionPortProtoString = z
    .string()
    .regex(/^(\d{1,5})(\/(tcp|udp))?$/)
    .refine(
        (val: string) => {
            const splitVal = val.split('/')

            return (
                zExposeInstructionPort.safeParse(splitVal[0]).success &&
                zExposeInstructionProto.safeParse(splitVal[1]).success
            )
        },
        { message: 'Invalid port protocol combination' }
    )

export const zExposeInstructionPortProtoTuple = z.union([
    z.tuple([zExposeInstructionPort]),
    z.tuple([zExposeInstructionPort, zExposeInstructionProto])
])

export const zExposeInstructionPortProtoObject = z.object({
    port: zExposeInstructionPort,
    proto: zExposeInstructionProto.optional()
})

export const zExposeInstructionParam = z.union([
    zExposeInstructionPortProtoObject,
    zExposeInstructionPortProtoTuple,
    zExposeInstructionPortProtoString,
    zExposeInstructionPort
])

export const zExposeInstructionParams = z.array(zExposeInstructionParam)
