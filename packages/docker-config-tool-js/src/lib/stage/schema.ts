import { z } from 'zod'

import {
    zFromInstructionObjectParam,
    zFromInstructionParams,
    zFromInstructionStringFromParam
} from '../instructions/from/schema'

export const zStage = z.object({
    type: z.literal('stage'),
    id: z.string()
})

export const zStageFromInstruction = zFromInstructionObjectParam.omit({ from: true }).extend({ from: zStage })

export const zStageConstructorParams = z.union([
    zStage,
    zFromInstructionStringFromParam,
    zFromInstructionParams,
    zStageFromInstruction
])
