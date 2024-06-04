import { z } from 'zod'
import { zGenericInstruction } from './generic/schema'
import { zBuildableInstruction } from './buildable/schema'

export const zInstruction = z.union([zGenericInstruction, zBuildableInstruction])
