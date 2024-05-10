import { z } from 'zod'

import { zDockerImageReference, zRequiredString } from '../../shared/schema'
import { zStage } from '../../stage/schema'

export const zCopyInstructionSources = z.union([zRequiredString(), z.array(zRequiredString()).nonempty()])

export const zCopyInstructionDestination = zRequiredString()

export const zCopyInstructionFrom = z.union([zDockerImageReference, zStage])

export const zCopyInstructionChown = zRequiredString()
    .min(2)
    .regex(/^(\d{1,5}|[a-z]{4,})(:(\d{1,5}|[a-z]{4,}))?$/)

export const zCopyInstructionChmod = z.coerce
    .string()
    .trim()
    .regex(/^[0-7]{3,4}$/)

export const zCopyInstructionLink = z.boolean()

export const zCopyInstructionParents = z.boolean()

export const zCopyInstructionExclude = zRequiredString().regex(/^[/.a-z0-9_-]+/)

export const zCopyInstructionExcludes = z.array(zCopyInstructionExclude)

export const zCopyInstructionParamObject = z.object({
    sources: zCopyInstructionSources,
    destination: zCopyInstructionDestination,
    from: zCopyInstructionFrom.optional(),
    chown: zCopyInstructionChown.optional(),
    chmod: zCopyInstructionChmod.optional(),
    link: zCopyInstructionLink.optional(),
    parents: zCopyInstructionLink.optional(),
    exclude: zCopyInstructionExclude.optional(),
    excludes: zCopyInstructionExcludes.optional()
})

export const zCopyInstructionParams = z
    .tuple([z.union([zRequiredString(), zCopyInstructionParamObject])])
    .rest(zRequiredString())
