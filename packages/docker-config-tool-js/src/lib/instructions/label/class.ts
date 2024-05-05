import { isPartialLabelVar, isPartialLabelVarArray, isStringRecord } from '../../shared/guards'
import { generateConstructorErrorMessage } from '../../shared/utils'
import { type ILabelInstruction, type LabelInstructionParams } from './types'

export class LabelInstruction implements ILabelInstruction {
    type = 'instruction' as const

    labels: Record<string, string> = {}

    public constructor(labelParam: LabelInstructionParams) {
        if (isPartialLabelVarArray(labelParam))
            labelParam.forEach((labelItem) => (this.labels[labelItem.split('=')[0]] = labelItem.split('=')[1]))
        else if (isPartialLabelVar(labelParam)) this.labels[labelParam.split('=')[0]] = labelParam.split('=')[1]
        else if (isStringRecord(labelParam)) this.labels = labelParam
        else throw new Error(generateConstructorErrorMessage('LABEL', labelParam))
    }

    addLabel(labelParam: string): void {
        if (!isPartialLabelVar(labelParam)) throw new Error('Invalid label argument')

        const [labelKey, labelVal] = labelParam.split('=')

        this.labels[labelKey] = labelVal
    }

    toString(): string {
        return `LABEL ${Object.entries(this.labels)
            .map(([k, v]) => [k, `"${v}"`].join('='))
            .join(' ')}`
    }
}
