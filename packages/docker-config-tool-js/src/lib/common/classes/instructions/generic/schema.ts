import { z } from 'zod'
import { zBaseInstruction } from '../base/schema'

export const zGenericInstruction = zBaseInstruction.extend({
    buildable: z.literal(false)
})
