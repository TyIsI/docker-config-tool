import { z } from 'zod'

import {
    zFromInstructionObjectParameter,
    zFromInstructionParameters,
    zFromInstructionStringFromParameter
} from '../instructions/from/schema'

export const zStage = z.object({
    type: z.literal('stage'),
    id: z.string()
})

export const zStageFromInstruction = zFromInstructionObjectParameter.omit({ from: true }).extend({ from: zStage })

export const zStageConstructorArgs = z.union([
    zStage,
    zFromInstructionStringFromParameter,
    zFromInstructionParameters,
    zStageFromInstruction
])
