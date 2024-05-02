import { z } from 'zod'
import { zRequiredString } from '../../shared/schema'

export const zAddInstructionSources = z.union([z.string(), z.array(z.string())])

export const zAddInstructionDestination = z.string()

export const zAddInstructionKeepGitDir = z.boolean()

export const zAddInstructionChecksum = z.string().regex(/^sha256:[0-9a-f]{64}/, 'Invalid checksum')

export const zAddInstructionChown = z.string().regex(/^(\d{1,5}|[a-z]{4,})(:(\d{1,5}|[a-z]{4,}))?$/)

export const zAddInstructionChmod = z
    .string()
    .regex(/^[0-7]{3,4}$/)
    .transform(Number)

export const zAddInstructionLink = z.boolean()

export const zAddInstructionExclude = z.string().regex(/^[/.a-z0-9_-]+/)

export const zAddInstructionExcludes = z.array(zAddInstructionExclude)

export const zAddInstructionParamObject = z.object({
    sources: zAddInstructionSources,
    destination: zAddInstructionDestination,
    keepGitDir: zAddInstructionKeepGitDir.optional(),
    checksum: zAddInstructionChecksum.optional(),
    chown: zAddInstructionChown.optional(),
    chmod: zAddInstructionChmod.optional(),
    link: zAddInstructionLink.optional(),
    exclude: zAddInstructionExclude.optional(),
    excludes: zAddInstructionExcludes.optional()
})

export const zAddInstructionParams = z.union(
    [
        z
            .array(zRequiredString(), { invalid_type_error: 'Invalid Add Instruction string array' })
            .min(2, 'Not enough Add Instruction string parameters'),
        z.tuple([zAddInstructionParamObject], { invalid_type_error: 'Invalid Add Instruction param object' })
    ],
    { invalid_type_error: 'Invalid Add Instruction param' }
)
