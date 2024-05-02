import { z } from 'zod'

export const zFromInstructionStringFromParameter = z
    .string()
    .trim()
    .min(3)
    .regex(/^[\w/-]+(:[\w/-]+)?/)

export const zFromInstructionPlatformParameter = z.string().trim().min(2)

export const zFromInstructionAsParameter = z.string().min(2)

export const zFromInstructionObjectParameter = z.object({
    from: zFromInstructionStringFromParameter,
    platform: zFromInstructionPlatformParameter.optional(),
    as: zFromInstructionAsParameter.optional()
})

export const zFromInstructionParameters = z.union([
    zFromInstructionStringFromParameter,
    zFromInstructionObjectParameter
])
