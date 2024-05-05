import { isString } from '../../shared/guards'
import { generateConstructorErrorMessage } from '../../shared/utils'
import { type IWorkdirInstruction } from './types'

export class WorkdirInstruction implements IWorkdirInstruction {
    type = 'instruction' as const

    workdir: string = ''

    public constructor(workdirParam: string) {
        if (!isString(workdirParam)) throw new Error(generateConstructorErrorMessage('WORKDIR', workdirParam))

        this.workdir = workdirParam
    }

    toString(): string {
        return ['WORKDIR', this.workdir].join(' ')
    }
}
