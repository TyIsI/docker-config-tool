import { type z } from 'zod'
import { type zBuildableInstruction } from './schema'

/*
 * Workaround for https://github.com/colinhacks/zod/issues/2990
 */
export interface BuildableInstruction extends Omit<z.infer<typeof zBuildableInstruction>, 'setOnBuild'> {
    setOnBuild: (onBuild?: boolean) => void
}

export type BuildableInstructions = BuildableInstruction[]
