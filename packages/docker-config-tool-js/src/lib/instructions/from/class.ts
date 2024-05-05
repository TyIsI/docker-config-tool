import { isString } from '../../shared/guards'
import { generateConstructorErrorMessage } from '../../shared/utils'
import { isFromInstructionAsParam, isFromInstructionParamObject, isFromInstructionParams } from './guards'
import { type FromInstructionParams, type IFromInstruction } from './types'

export class FromInstruction implements IFromInstruction {
    type = 'instruction' as const

    from: string = ''
    platform?: string
    as?: string

    public constructor(fromParam: FromInstructionParams) {
        if (!isFromInstructionParams(fromParam)) throw new Error(generateConstructorErrorMessage(`FROM`, fromParam))

        if (isString(fromParam)) this.from = fromParam

        if (isFromInstructionParamObject(fromParam)) {
            this.from = fromParam.from

            if (isString(fromParam.platform)) this.platform = fromParam.platform

            if (isString(fromParam.as)) this.as = fromParam.as
        }
    }

    setAs(nameParam: string): this {
        if (!isFromInstructionAsParam(nameParam))
            throw new Error(`Missing or invalid arguments for setAs: ${typeof nameParam} ${JSON.stringify(nameParam)}`)

        this.as = nameParam

        return this
    }

    toString(): string {
        const result = ['FROM']

        if (isString(this.platform)) result.push(`--platform=${this.platform}`)

        result.push(this.from)

        if (isString(this.as)) result.push(`AS ${this.as}`)

        return result.join(' ')
    }
}
