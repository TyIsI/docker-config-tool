import { isString } from '../../shared/guards'
import { generateConstructorErrorMessage } from '../../shared/utils'
import { isFromInstructionAsParameter, isFromInstructionParameterObject, isFromInstructionParameters } from './guards'
import { type FromInstructionParameters, type IFromInstruction } from './types'

export class FromInstruction implements IFromInstruction {
    type = 'instruction' as const

    from: string = ''
    platform?: string
    as?: string

    constructor(from: FromInstructionParameters) {
        if (!isFromInstructionParameters(from)) throw new Error(generateConstructorErrorMessage(`FROM`, from))

        if (isString(from)) this.from = from

        if (isFromInstructionParameterObject(from)) {
            this.from = from.from

            if (isString(from.platform)) this.platform = from.platform

            if (isString(from.as)) this.as = from.as
        }
    }

    setAs(name: string): this {
        if (!isFromInstructionAsParameter(name))
            throw new Error(`Missing or invalid arguments for setAs: ${typeof name} ${JSON.stringify(name)}`)

        this.as = name

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
