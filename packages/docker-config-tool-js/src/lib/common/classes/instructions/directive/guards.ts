import { zEscapeDirective, zSyntaxDirective, zValidDirective } from './schema'
import { type EscapeDirective, type SyntaxDirective, type ValidDirectives } from './types'

export const isEscapeDirective = (value?: unknown): value is EscapeDirective =>
    zEscapeDirective.safeParse(value).success

export const isSyntaxDirective = (value?: unknown): value is SyntaxDirective =>
    zSyntaxDirective.safeParse(value).success

export const isValidDirective = (value?: unknown): value is ValidDirectives => zValidDirective.safeParse(value).success
