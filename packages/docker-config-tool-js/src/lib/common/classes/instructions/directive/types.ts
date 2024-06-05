import { type z } from 'zod'
import {
    type zDirectiveInstruction,
    type zEscapeDirective,
    type zSyntaxDirective,
    type zValidDirective
} from './schema'

export type IDirectiveInstruction = z.infer<typeof zDirectiveInstruction>

export type EscapeDirective = z.infer<typeof zEscapeDirective>

export type SyntaxDirective = z.infer<typeof zSyntaxDirective>

export type ValidDirectives = z.infer<typeof zValidDirective>
