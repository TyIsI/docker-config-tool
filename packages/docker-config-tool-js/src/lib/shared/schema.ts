import { z } from 'zod'

export const zRequiredString = (message?: string | { message: string }): z.ZodString =>
    z
        .string()
        .trim()
        .regex(/.+/, message ?? 'Invalid string input')

export const zUnixUserGroupNumericId = z.coerce
    .number({ invalid_type_error: 'invalid numeric unix id' })
    .min(1)
    .max(65535)

export const zUnixUserGroupStringId = z
    .string({ invalid_type_error: 'invalid unix id string' })
    .refine((val) => zUnixUserGroupNumericId.safeParse(val).success)

export const zUnixUserGroupId = z.union([zUnixUserGroupNumericId, zUnixUserGroupStringId])

export const zUnixUserGroupIdComboString = z
    .string({ invalid_type_error: 'invalid unix id string tuple' })
    .regex(/\d{1,5}(:\d{1,5})/)
    .refine((val) => (val.includes(':') ? val.split(':').filter((e) => e != null && e !== '').length === 2 : true))
    .refine((val) => val.split(':').every((e) => zUnixUserGroupNumericId.safeParse(e).success))
    .transform((val) => val.split(':').map((e) => Number(e)))

export const zFileAccessMode = z
    .union([z.number(), z.string()], { invalid_type_error: 'invalid unix file access mode permission' })
    .refine((val) => /^[0-7]{3,4}$/.test(val.toString()))
    .transform(String)

export const zUIDOpt = z.object({ uid: zUnixUserGroupId }, { invalid_type_error: 'invalid unix uid opt' })

export const zGIDOpt = z.object({ gid: zUnixUserGroupId }, { invalid_type_error: 'invalid unix gid opt' })

export const zUIDGIDTuple = z.union([z.tuple([zUnixUserGroupId]), z.tuple([zUnixUserGroupId, zUnixUserGroupId])], {
    invalid_type_error: 'invalid unix uid/gid tuple'
})

export const zUIDGIDObj = zUIDOpt.extend({ gid: zUnixUserGroupId.optional() })

export const zRWOpt = z.object({ rw: z.boolean() })

export const zReadWriteOpt = z.object({ readwrite: z.boolean() })

export const zROOpt = z.object({ ro: z.boolean() })

export const zReadOnlyOpt = z.object({ readonly: z.boolean() })

export const zStringRecord = z.record(z.string(), z.coerce.string()).refine((val) => Object.keys(val).length > 0)

export const zPartialEnvVar = z.string().regex(/^([a-zA-Z_]\w*)(=.+)?$/)

export const zEnvVar = z.string().regex(/^([a-zA-Z_]\w*)=.+$/)

export const zPartialEnvVarArray = z.array(zPartialEnvVar).nonempty()

export const zEnvVarArray = z.array(zEnvVar).nonempty()

export const zPartialLabelVar = z.string().regex(/^([a-zA-Z_.][\w.]*)(=.+)?$/)

export const zLabelVar = z.string().regex(/^([a-zA-Z_.][\w.]*)=.+$/)

export const zPartialLabelVarArray = z.array(zPartialLabelVar).nonempty()

export const zLabelVarArray = z.array(zLabelVar).nonempty()

export const zNetworkProtocolTCP = z.literal('tcp')

export const zNetworkProtocolUDP = z.literal('udp')

export const zNetworkProtocols = z.union([zNetworkProtocolTCP, zNetworkProtocolUDP])
