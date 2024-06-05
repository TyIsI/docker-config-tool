import { z } from 'zod'
import { zBaseInstruction, zCommentInstructionLiteral } from '../base/schema'

export const zDirectiveInstruction = zBaseInstruction.extend({
    type: z.literal('directive'),

    instruction: zCommentInstructionLiteral
})

export const zSyntaxDirective = z.literal('syntax')

export const zEscapeDirective = z.literal('escape')

export const zValidDirective = z.union([zSyntaxDirective, zEscapeDirective])
