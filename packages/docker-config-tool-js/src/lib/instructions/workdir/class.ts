import { isString } from '../../shared/guards'
import { generateConstructorErrorMessage } from '../../shared/utils'
import { type IWorkDirInstruction } from './types'

export class WorkDirInstruction implements IWorkDirInstruction {
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
