import { isString } from '../../shared/guards'
import { generateConstructorErrorMessage } from '../../shared/utils'
import { isArgInstructionParameterObject, isArgInstructionParameters } from './guards'
import { type ArgInstructionParameters, type IArgInstruction } from './types'

export class ArgInstruction implements IArgInstruction {
    type = 'instruction' as const

    argName?: string
    argValue?: string

    constructor(argParam: ArgInstructionParameters) {
        if (!isArgInstructionParameters(argParam)) throw new Error(generateConstructorErrorMessage('ARG', argParam))

        if (isArgInstructionParameterObject(argParam)) {
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

    toString(): string {
        return `ARG ${[this.argName, this.argValue].filter((e) => e != null && e !== '').join('=')}`
    }
}
