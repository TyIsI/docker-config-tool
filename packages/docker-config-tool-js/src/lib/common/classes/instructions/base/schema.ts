import { z } from 'zod'

export const zNopInstructionLiteral = z.literal('# NOP')
export const zAddInstructionLiteral = z.literal('ADD')
export const zArgInstructionLiteral = z.literal('ARG')
export const zCmdInstructionLiteral = z.literal('CMD')
export const zCommentInstructionLiteral = z.literal('#')
export const zCopyInstructionLiteral = z.literal('COPY')
export const zEntryPointInstructionLiteral = z.literal('ENTRYPOINT')
export const zEnvInstructionLiteral = z.literal('ENV')
export const zExposeInstructionLiteral = z.literal('EXPOSE')
export const zFromInstructionLiteral = z.literal('FROM')
export const zHealthCheckInstructionLiteral = z.literal('HEALTHCHECK')
export const zLabelInstructionLiteral = z.literal('LABEL')
export const zRunInstructionLiteral = z.literal('RUN')
export const zShellInstructionLiteral = z.literal('SHELL')
export const zStopSignalInstructionLiteral = z.literal('STOPSIGNAL')
export const zUserInstructionLiteral = z.literal('USER')
export const zVolumeInstructionLiteral = z.literal('VOLUME')
export const zWorkDirInstructionLiteral = z.literal('WORKDIR')

export const zValidInstructions = z.union([
    zNopInstructionLiteral,
    zAddInstructionLiteral,
    zArgInstructionLiteral,
    zCmdInstructionLiteral,
    zCommentInstructionLiteral,
    zCopyInstructionLiteral,
    zEntryPointInstructionLiteral,
    zEnvInstructionLiteral,
    zExposeInstructionLiteral,
    zFromInstructionLiteral,
    zHealthCheckInstructionLiteral,
    zLabelInstructionLiteral,
    zRunInstructionLiteral,
    zShellInstructionLiteral,
    zStopSignalInstructionLiteral,
    zUserInstructionLiteral,
    zVolumeInstructionLiteral,
    zWorkDirInstructionLiteral
])

export const zBaseInstruction = z.object({
    type: z.literal('instruction'),

    instruction: zValidInstructions,

    toString: z.function().args().returns(z.string())
})
