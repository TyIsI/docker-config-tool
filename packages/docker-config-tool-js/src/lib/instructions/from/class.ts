import { AbstractGenericInstruction } from '../../common/classes/instructions/generic/class'
import { isString } from '../../shared/guards'
import { generateConstructorErrorMessage } from '../../shared/utils'
import { isFromInstructionAsParam, isFromInstructionObjectParam, isFromInstructionParams } from './guards'
import { type FromInstructionParams, type IFromInstruction } from './types'

export class FromInstruction extends AbstractGenericInstruction implements IFromInstruction {
    type = 'instruction' as const

    instruction = 'FROM' as const

    from: string = ''
    platform?: string
    as?: string

    public constructor(fromParam: FromInstructionParams) {
        super()

        if (!isFromInstructionParams(fromParam)) throw new Error(generateConstructorErrorMessage(`FROM`, fromParam))

        if (isString(fromParam)) this.from = fromParam

        if (isFromInstructionObjectParam(fromParam)) {
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
        const output: string[] = [this.instruction]

        if (isString(this.platform)) output.push(`--platform=${this.platform}`)

        output.push(this.from)

        if (isString(this.as)) output.push(`AS ${this.as}`)

        return output.join(' ')
    }
}
