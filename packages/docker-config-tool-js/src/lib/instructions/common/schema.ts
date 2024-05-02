import { z } from 'zod'

export const zInstruction = z.object({
    type: z.literal('instruction'),

    toString: z.function().returns(z.string())
})
