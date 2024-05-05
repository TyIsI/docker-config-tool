import { z } from 'zod'

export const zFromInstructionStringFromParam = z
    .string()
    .trim()
    .min(3)
    .regex(/^[\w/-]+(:[\w/-]+)?/)

export const zFromInstructionPlatformParam = z.string().trim().min(2)

export const zFromInstructionAsParam = z.string().min(2)

export const zFromInstructionObjectParam = z.object({
    from: zFromInstructionStringFromParam,
    platform: zFromInstructionPlatformParam.optional(),
    as: zFromInstructionAsParam.optional()
})

export const zFromInstructionParams = z.union([zFromInstructionStringFromParam, zFromInstructionObjectParam])
