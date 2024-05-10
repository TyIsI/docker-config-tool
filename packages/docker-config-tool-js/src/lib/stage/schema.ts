import { z } from 'zod'

import { zFromInstructionObjectParam } from '../instructions/from/schema'
import { zDockerImageReference } from '../shared/schema'

export const zStage = z.object({
    type: z.literal('stage'),
    id: z.string()
})

export const zStageFromInstructionObjectParam = zFromInstructionObjectParam
    .omit({ from: true })
    .extend({ from: zStage })

export const zStageParams = z.union([
    zDockerImageReference,
    zFromInstructionObjectParam,
    zStage,
    zStageFromInstructionObjectParam
])
