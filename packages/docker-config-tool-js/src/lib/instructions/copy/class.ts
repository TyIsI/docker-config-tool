import { coerceStringArray } from '../../shared/coerce'
import { isObjectWithProperty, isString, isStringArray } from '../../shared/guards'
import { generateConstructorErrorMessage } from '../../shared/utils'
import { isStageParam } from '../../stage/guards'
import { type IStage } from '../../stage/types'
import {
    isCopyInstructionChmod,
    isCopyInstructionChown,
    isCopyInstructionDestination,
    isCopyInstructionExclude,
    isCopyInstructionFrom,
    isCopyInstructionLink,
    isCopyInstructionParamObject,
    isCopyInstructionParents,
    isCopyInstructionSources
} from './guards'
import { type CopyInstructionParamObject, type CopyInstructionParams, type ICopyInstruction } from './types'
import {
    validateCopyInstructionLink,
    validateCopyInstructionParams,
    validateCopyInstructionParents
} from './validators'

export class CopyInstruction implements ICopyInstruction {
    type = 'instruction' as const

    sources: string[] = []
    destination: string = ''

    from?: string
    chown?: string
    chmod?: string
    link?: boolean
    parents?: boolean

    excludes?: string[]

    public constructor(...copyInstructionParams: CopyInstructionParams) {
        const [valid, error] = validateCopyInstructionParams(copyInstructionParams)

        if (!valid) throw new Error(generateConstructorErrorMessage(`COPY`, copyInstructionParams, error))

        if (isCopyInstructionParamObject(copyInstructionParams[0])) {
            this.hoistCopyObject(copyInstructionParams[0])
        } else if (isStringArray(copyInstructionParams)) {
            const joinedParams = coerceStringArray(copyInstructionParams)

            this.destination = joinedParams.splice(joinedParams.length - 1, 1)[0]

            this.sources = joinedParams
        }
    }

    private hoistCopyObject(copyParams: CopyInstructionParamObject): void {
        if (isCopyInstructionSources(copyParams.sources)) this.sources = coerceStringArray(copyParams.sources)

        if (isCopyInstructionDestination(copyParams.destination)) this.destination = copyParams.destination

        if (isCopyInstructionFrom(copyParams.from))
            this.from = isStageParam(copyParams.from) ? copyParams.from.id : copyParams.from

        if (isCopyInstructionChown(copyParams.chown)) this.chown = copyParams.chown

        if (isCopyInstructionChmod(copyParams.chmod)) this.chmod = copyParams.chmod

        if (isCopyInstructionLink(copyParams.link)) this.link = copyParams.link

        if (isCopyInstructionParents(copyParams.link)) this.link = copyParams.link

        if (isString(copyParams.exclude)) {
            if (this.excludes == null) this.excludes = []

            this.excludes.push(copyParams.exclude)
        }

        if (isStringArray(copyParams.excludes)) {
            if (this.excludes != null) this.excludes = this.excludes.concat(copyParams.excludes)
            else this.excludes = copyParams.excludes
        }
    }

    public setFrom(from: string | IStage): this {
        if (isString(from)) this.from = from
        if (isObjectWithProperty<IStage>(from, 'id')) this.from = from.id

        return this
    }

    public setChown(chown: string): this {
        if (!isCopyInstructionChown(chown)) throw new Error(`Invalid input for setChown: ${JSON.stringify(chown)}`)

        this.chown = chown

        return this
    }

    public setChmod(chmod: string): this {
        if (!isCopyInstructionChmod(chmod)) throw new Error(`Invalid input for setChmod: ${JSON.stringify(chmod)}`)

        this.chmod = chmod

        return this
    }

    public setLink(link?: boolean): this {
        const [valid, error] = validateCopyInstructionLink(link)

        if (!valid) throw new Error(`Invalid input for setLink: ${error?.join(', ')}`)

        link = link ?? true

        this.link = link

        return this
    }

    public setLinked(): this {
        this.link = true

        return this
    }

    setParents(parents?: boolean): this {
        const [valid, error] = validateCopyInstructionParents(parents)

        if (!valid) throw new Error(`Invalid input for setParents: ${error?.join(', ')}`)

        parents = parents ?? true

        this.parents = parents

        return this
    }

    public addExclude(exclude: string): this {
        if (!isCopyInstructionExclude(exclude))
            throw new Error(`Invalid input for addExclude: "${JSON.stringify(exclude)}"`)

        if (this.excludes == null) this.excludes = []

        this.excludes.push(exclude)

        return this
    }

    public toString(): string {
        const result = ['COPY']

        if (this.from != null) result.push(`--from=${this.from}`)

        if (this.chown != null) result.push(`--chown=${this.chown}`)

        if (this.chmod != null) result.push(`--chmod=${this.chmod}`)

        if (this.link != null && this.link) result.push(`--link`)

        if (this.parents != null && this.parents) result.push(`--parents`)

        if (this.excludes != null) this.excludes.forEach((e) => result.push(`--exclude=${e}`))

        this.sources.forEach((s) => result.push(s))

        result.push(this.destination)

        return result.join(' ')
    }
}
