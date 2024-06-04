import { AbstractBuildableInstruction } from '../../common/classes/instructions/buildable/class'
import { isPartialLabelVar, isPartialLabelVarArray, isStringRecord } from '../../shared/guards'
import { generateConstructorErrorMessage } from '../../shared/utils'
import { type ILabelInstruction, type LabelInstructionParams } from './types'

export class LabelInstruction extends AbstractBuildableInstruction implements ILabelInstruction {
    type = 'instruction' as const

    instruction = 'LABEL' as const

    labels: Record<string, string> = {}

    public constructor(labelParam: LabelInstructionParams) {
        super()

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
        const output: string[] = [this.instruction]

        if (this.onBuild) output.unshift('ONBUILD')

        Object.entries(this.labels)
            .map(([k, v]) => [k, `"${v}"`].join('='))
            .forEach((e) => output.push(e))

        return output.join(' ')
    }
}
