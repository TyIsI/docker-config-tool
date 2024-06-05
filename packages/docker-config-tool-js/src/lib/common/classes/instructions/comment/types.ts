import { type z } from 'zod'
import { type zCommentInstruction } from './schema'

export type ICommentInstruction = z.infer<typeof zCommentInstruction>
