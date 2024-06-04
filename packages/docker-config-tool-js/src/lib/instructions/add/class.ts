import { AbstractBuildableInstruction } from '../../common/classes/instructions/buildable/class'
import { coerceStringArray } from '../../shared/coerce'
import { isString, isStringArray } from '../../shared/guards'
import { generateConstructorErrorMessage } from '../../shared/utils'
import {
    isAddInstructionChecksum,
    isAddInstructionChmod,
    isAddInstructionChown,
    isAddInstructionExclude,
    isAddInstructionExcludes,
    isAddInstructionKeepGitDir,
    isAddInstructionLink,
    isAddInstructionParamObject,
    isAddInstructionSources,
    isOptionalAddInstructionKeepGitDir,
    isOptionalAddInstructionLink
} from './guards'
import { type AddInstructionParamObject, type AddInstructionParams, type IAddInstruction } from './types'
import { validateAddInstructionParams } from './validators'

export class AddInstruction extends AbstractBuildableInstruction implements IAddInstruction {
    type = 'instruction' as const

    instruction = 'ADD' as const

    sources: string[] = []
    destination: string = ''

    keepGitDir: boolean = false
    checksum?: string
    chown?: string
    chmod?: string
    link?: boolean
    excludes?: string[]

    public constructor(...addInstructionParams: AddInstructionParams) {
        super()

        const [valid, error] = validateAddInstructionParams(addInstructionParams)

        if (!valid) {
            throw new Error(generateConstructorErrorMessage('ADD', addInstructionParams, error))
        } else if (isAddInstructionParamObject(addInstructionParams[0])) {
            this.hoistAddObject(addInstructionParams[0])
        } else if (isStringArray(addInstructionParams)) {
            const joinedParams: string[] = addInstructionParams

            this.destination = joinedParams.splice(joinedParams.length - 1, 1)[0]

            this.sources = joinedParams
        }
    }

    private hoistAddObject(addParamsObject: AddInstructionParamObject): void {
        if (isAddInstructionSources(addParamsObject.sources)) this.sources = coerceStringArray(addParamsObject.sources)

        if (isString(addParamsObject.destination)) this.destination = addParamsObject.destination

        if (isAddInstructionKeepGitDir(addParamsObject.keepGitDir)) this.keepGitDir = addParamsObject.keepGitDir

        if (isAddInstructionChecksum(addParamsObject.checksum)) this.checksum = addParamsObject.checksum

        if (isAddInstructionChown(addParamsObject.chown)) this.chown = addParamsObject.chown

        if (isAddInstructionChmod(addParamsObject.chmod)) this.chmod = addParamsObject.chmod

        if (isAddInstructionLink(addParamsObject.link)) this.link = addParamsObject.link

        if (isAddInstructionExclude(addParamsObject.exclude)) {
            if (this.excludes == null) this.excludes = []

            this.excludes.push(addParamsObject.exclude)
        }

        if (isAddInstructionExcludes(addParamsObject.excludes)) {
            if (this.excludes != null) this.excludes = this.excludes.concat(addParamsObject.excludes)
            else this.excludes = addParamsObject.excludes
        }
    }

    public setKeepGitDir(keepGitDir?: boolean): this {
        if (!isOptionalAddInstructionKeepGitDir(keepGitDir))
            throw new Error(`Invalid input for setKeepGitDir: ${JSON.stringify(keepGitDir)}`)

        keepGitDir = keepGitDir ?? true

        this.keepGitDir = keepGitDir

        return this
    }

    public setChecksum(checksum: string): this {
        if (!isAddInstructionChecksum(checksum))
            throw new Error(`Invalid input for setChecksum: ${JSON.stringify(checksum)}`)

        this.checksum = checksum

        return this
    }

    public setChown(chown: string): this {
        if (!isAddInstructionChown(chown)) throw new Error(`Invalid input for setChown: ${JSON.stringify(chown)}`)

        this.chown = chown

        return this
    }

    public setChmod(chmod: string): this {
        if (!isAddInstructionChmod(chmod)) throw new Error(`Invalid input for setChmod: ${JSON.stringify(chmod)}`)

        this.chmod = chmod

        return this
    }

    public setLink(link?: boolean): this {
        if (!isOptionalAddInstructionLink(link)) throw new Error(`Invalid input for setLink: ${JSON.stringify(link)}`)

        link = link ?? true

        this.link = link

        return this
    }

    public addExclude(exclude: string): this {
        if (!isAddInstructionExclude(exclude))
            throw new Error(`Invalid input for addExclude: "${JSON.stringify(exclude)}"`)

        if (this.excludes == null) this.excludes = []

        this.excludes.push(exclude)

        return this
    }

    public toString(): string {
        const output: string[] = [this.instruction]

        if (this.onBuild) output.unshift('ONBUILD')

        if (this.keepGitDir) output.push(`--keepGitDir`)

        if (this.checksum != null) output.push(`--checksum=${this.checksum}`)

        if (this.chown != null) output.push(`--chown=${this.chown}`)

        if (this.chmod != null) output.push(`--chmod=${this.chmod}`)

        if (this.link != null && this.link) output.push(`--link`)

        if (this.excludes != null) this.excludes.forEach((e) => output.push(`--exclude=${e}`))

        this.sources.forEach((s) => output.push(s))

        output.push(this.destination)

        return output.join(' ')
    }
}
