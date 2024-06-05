import { z } from 'zod'
import { zBaseInstruction, zCommentInstructionLiteral } from '../base/schema'

export const zCommentInstruction = zBaseInstruction.extend({
    type: z.literal('comment'),

    instruction: zCommentInstructionLiteral
})
