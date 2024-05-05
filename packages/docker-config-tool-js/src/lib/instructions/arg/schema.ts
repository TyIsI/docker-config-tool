import { z } from 'zod'

export const zArgInstructionParamsObject = z.object({
    name: z.string().trim().min(2),
    value: z.string().trim().min(2).optional()
})

export const zArgInstructionParams = z.union([z.string().trim().min(2), zArgInstructionParamsObject])
