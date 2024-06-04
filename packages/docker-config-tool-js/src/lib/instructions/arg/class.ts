import { AbstractBuildableInstruction } from '../../common/classes/instructions/buildable/class'
import { isString } from '../../shared/guards'
import { generateConstructorErrorMessage, generateInvalidArgumentErrorMessage } from '../../shared/utils'
import { isArgInstructionParamObject, isArgInstructionParams } from './guards'
import { type ArgInstructionParams, type IArgInstruction } from './types'

export class ArgInstruction extends AbstractBuildableInstruction implements IArgInstruction {
    type = 'instruction' as const

    instruction = 'ARG' as const

    argName?: string
    argValue?: string

    public constructor(argParam: ArgInstructionParams) {
        super()

        if (!isArgInstructionParams(argParam)) throw new Error(generateConstructorErrorMessage('ARG', argParam))

        if (isArgInstructionParamObject(argParam)) {
            const { name, value } = argParam

            this.argName = name

            if (isString(value)) this.argValue = value
        }

        if (isString(argParam)) {
            const [name, value] = argParam.split('=')

            this.argName = name

            if (typeof value === 'string' && value === '')
                throw new Error(generateConstructorErrorMessage(`ARG`, argParam))

            this.argValue = value
        }
    }

    public toString(): string {
        const output: string[] = [this.instruction]

        if (this.onBuild) output.unshift('ONBUILD')

        if (this.argName == null || this.argName === '')
            throw new Error(generateInvalidArgumentErrorMessage('ARG', 'Invalid argname'))

        output.push(
            [this.argName, this.argValue != null && this.argValue !== '' ? this.argValue : null]
                .filter((e) => e != null)
                .join('=')
        )

        return output.join(' ')
    }
}
