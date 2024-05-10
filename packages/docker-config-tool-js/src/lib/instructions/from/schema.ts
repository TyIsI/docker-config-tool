import { z } from 'zod'
import { zDockerImageReference, zRequiredString } from '../../shared/schema'

export const zFromInstructionPlatformParam = zRequiredString().min(2)

export const zFromInstructionAsParam = zRequiredString().min(2)

export const zFromInstructionObjectParam = z.object({
    from: zDockerImageReference,
    platform: zFromInstructionPlatformParam.optional(),
    as: zFromInstructionAsParam.optional()
})

export const zFromInstructionParams = z.union([zDockerImageReference, zFromInstructionObjectParam])
