import { type ResultOptionalTuple, type ResultTuple } from '../../shared/types'
import { reduceZodErrors } from '../../shared/utils'
import { zCopyInstructionLink, zCopyInstructionParams, zCopyInstructionParents } from './schema'
import { type CopyInstructionLink, type CopyInstructionParams, type CopyInstructionParents } from './types'

export const validateCopyInstructionLink = (value?: CopyInstructionLink): ResultOptionalTuple<CopyInstructionLink> => {
    const result = zCopyInstructionLink.optional().safeParse(value)

    return result.success ? [true, value] : [false, reduceZodErrors(result.error)]
}

export const validateCopyInstructionParents = (
    value?: CopyInstructionParents
): ResultOptionalTuple<CopyInstructionParents> => {
    const result = zCopyInstructionParents.optional().safeParse(value)

    return result.success ? [true, value] : [false, reduceZodErrors(result.error)]
}

export const validateCopyInstructionParams = (value: CopyInstructionParams): ResultTuple<CopyInstructionParams> => {
    const result = zCopyInstructionParams.safeParse(value)

    return result.success ? [true, value] : [false, reduceZodErrors(result.error)]
}
