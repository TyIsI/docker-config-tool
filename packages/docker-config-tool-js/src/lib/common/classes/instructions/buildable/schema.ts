import { z } from 'zod'
import { zBaseInstruction } from '../base/schema'

export const zBuildableInstruction = zBaseInstruction.extend({
    buildable: z.literal(true),

    setOnBuild: z.function().args(z.boolean().optional()).returns(z.void())
})
