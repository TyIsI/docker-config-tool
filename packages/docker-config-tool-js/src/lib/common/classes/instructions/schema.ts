import { z } from 'zod'
import { zBuildableInstruction } from './buildable/schema'
import { zCommentInstruction } from './comment/schema'
import { zDirectiveInstruction } from './directive/schema'
import { zGenericInstruction } from './generic/schema'

export const zInstruction = z.union([
    zGenericInstruction,
    zBuildableInstruction,
    zCommentInstruction,
    zDirectiveInstruction
])
