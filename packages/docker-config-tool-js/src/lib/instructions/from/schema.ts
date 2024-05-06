import { z } from 'zod'

const FromInstructionURLRE =
    /^((\$\{.+\})?[\w.-]*(:\d{1,5})?\/)?(([\w/-]+|(\$\{.+\}))\/)?([\w/-]+|(\$\{.+\}))(:([\w/-]+|\$\{.+\}))?(@(sha256:\w{64}|\$\{.+\}))?$/

export const zFromInstructionStringFromParam = z.string().trim().min(3).regex(FromInstructionURLRE)

export const zFromInstructionPlatformParam = z.string().trim().min(2)

export const zFromInstructionAsParam = z.string().min(2)

export const zFromInstructionObjectParam = z.object({
    from: zFromInstructionStringFromParam,
    platform: zFromInstructionPlatformParam.optional(),
    as: zFromInstructionAsParam.optional()
})

export const zFromInstructionParams = z.union([zFromInstructionStringFromParam, zFromInstructionObjectParam])
