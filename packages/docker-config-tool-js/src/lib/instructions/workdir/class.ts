import { isString } from '../../shared/guards'
import { generateConstructorErrorMessage } from '../../shared/utils'
import { type IWorkDirInstruction } from './types'

export class WorkdirInstruction implements IWorkDirInstruction {
    type = 'instruction' as const

    workdir: string = ''

    constructor(workdir: string) {
        if (!isString(workdir)) throw new Error(generateConstructorErrorMessage('WORKDIR', workdir))

        this.workdir = workdir
    }

    toString(): string {
        return ['WORKDIR', this.workdir].join(' ')
    }
}
