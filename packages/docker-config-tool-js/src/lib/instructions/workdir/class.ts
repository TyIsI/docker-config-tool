import { AbstractBuildableInstruction } from '../../common/classes/instructions/buildable/class'
import { isString } from '../../shared/guards'
import { generateConstructorErrorMessage } from '../../shared/utils'
import { type IWorkDirInstruction } from './types'

export class WorkDirInstruction extends AbstractBuildableInstruction implements IWorkDirInstruction {
    type = 'instruction' as const

    instruction = 'WORKDIR' as const

    workdir: string = ''

    public constructor(workdirParam: string) {
        super()

        if (!isString(workdirParam)) throw new Error(generateConstructorErrorMessage('WORKDIR', workdirParam))

        this.workdir = workdirParam
    }

    toString(): string {
        const output: string[] = [this.instruction]

        if (this.onBuild) output.unshift('ONBUILD')

        output.push(this.workdir)

        return output.join(' ')
    }
}
