import { z } from 'zod'

export const zNopInstruction = z.literal('# NOP')
export const zAddInstruction = z.literal('ADD')
export const zArgInstruction = z.literal('ARG')
export const zCmdInstruction = z.literal('CMD')
export const zCopyInstruction = z.literal('COPY')
export const zEntryPointInstruction = z.literal('ENTRYPOINT')
export const zEnvInstruction = z.literal('ENV')
export const zExposeInstruction = z.literal('EXPOSE')
export const zFromInstruction = z.literal('FROM')
export const zHealthCheckInstruction = z.literal('HEALTHCHECK')
export const zLabelInstruction = z.literal('LABEL')
export const zRunInstruction = z.literal('RUN')
export const zShellInstruction = z.literal('SHELL')
export const zStopSignalInstruction = z.literal('STOPSIGNAL')
export const zUserInstruction = z.literal('USER')
export const zVolumeInstruction = z.literal('VOLUME')
export const zWorkDirInstruction = z.literal('WORKDIR')

export const zValidInstructions = z.union([
    zNopInstruction,
    zAddInstruction,
    zArgInstruction,
    zCmdInstruction,
    zCopyInstruction,
    zEntryPointInstruction,
    zEnvInstruction,
    zExposeInstruction,
    zFromInstruction,
    zHealthCheckInstruction,
    zLabelInstruction,
    zRunInstruction,
    zShellInstruction,
    zStopSignalInstruction,
    zUserInstruction,
    zVolumeInstruction,
    zWorkDirInstruction
])

export const zBaseInstruction = z.object({
    type: z.literal('instruction'),

    instruction: zValidInstructions,

    toString: z.function().args().returns(z.string())
})
