import { z } from 'zod'

export const zArgInstructionParametersObject = z.object({
    name: z.string().trim().min(2),
    value: z.string().trim().min(2).optional()
})

export const zArgInstructionParameters = z.union([z.string().trim().min(2), zArgInstructionParametersObject])
