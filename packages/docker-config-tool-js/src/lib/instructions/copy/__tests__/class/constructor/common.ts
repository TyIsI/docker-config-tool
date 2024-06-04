import { generateConstructorErrorMessage } from '../../../../../shared/utils'
import { Stage } from '../../../../../stage/class'
import { CopyInstruction } from '../../../class'
import { type CopyInstructionParamObject } from '../../../types'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`COPY`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        describe(`common`, () => {
                            test(`create a instruction with a source and destination`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                expect(copyInstruction.toString()).toBe('COPY . .')
                            })

                            test(`create a instruction with multiple sources and a destination`, () => {
                                const copyInstruction = new CopyInstruction('package.json', 'pnpm-lock.yaml', '.')

                                expect(copyInstruction.toString()).toBe('COPY package.json pnpm-lock.yaml .')
                            })

                            test(`creating a instruction with an invalid source and destination should fail`, () => {
                                expect(() => {
                                    // @ts-expect-error not string
                                    const copyInstruction = new CopyInstruction(false, true)

                                    copyInstruction.toString()
                                }).toThrow(
                                    generateConstructorErrorMessage(
                                        'COPY',
                                        [false, true],
                                        ['Invalid input', 'Expected string, received boolean']
                                    )
                                )
                            })

                            test(`creating a instruction with a minimum valid object`, () => {
                                const copyParams: CopyInstructionParamObject = {
                                    sources: '.',
                                    destination: '.'
                                }

                                const copyInstruction = new CopyInstruction(copyParams)

                                expect(copyInstruction.toString()).toBe('COPY . .')
                            })

                            test(`creating a instruction with a minimum valid object with multiple sources`, () => {
                                const copyParams: CopyInstructionParamObject = {
                                    sources: ['package.json', 'pnpm-lock.yaml'],
                                    destination: '.'
                                }

                                const copyInstruction = new CopyInstruction(copyParams)

                                expect(copyInstruction.toString()).toBe('COPY package.json pnpm-lock.yaml .')
                            })

                            test(`creating a instruction with a full valid object`, () => {
                                const copyParams: CopyInstructionParamObject = {
                                    sources: '.',
                                    destination: '.',
                                    from: 'workspace',
                                    chown: '54321:54321',
                                    chmod: '755',
                                    link: true,
                                    parents: true,
                                    exclude: '.git',
                                    excludes: ['node_modules']
                                }

                                const copyInstruction = new CopyInstruction(copyParams)

                                expect(copyInstruction.toString()).toBe(
                                    'COPY --from=workspace --chown=54321:54321 --chmod=755 --link --exclude=.git --exclude=node_modules . .'
                                )
                            })

                            test(`creating a instruction with a full valid object and multiple sources`, () => {
                                const copyParams: CopyInstructionParamObject = {
                                    sources: ['package.json', 'pnpm-lock.yaml'],
                                    destination: '.',
                                    from: 'workspace',
                                    chown: '54321:54321',
                                    chmod: '755',
                                    link: true,
                                    parents: true,
                                    exclude: '.git',
                                    excludes: ['node_modules']
                                }

                                const copyInstruction = new CopyInstruction(copyParams)

                                expect(copyInstruction.toString()).toBe(
                                    'COPY --from=workspace --chown=54321:54321 --chmod=755 --link --exclude=.git --exclude=node_modules package.json pnpm-lock.yaml .'
                                )
                            })

                            test(`creating a instruction with a full valid object minus exclude opt`, () => {
                                const copyParams: CopyInstructionParamObject = {
                                    sources: '.',
                                    destination: '.',
                                    from: 'workspace',
                                    chown: '54321:54321',
                                    chmod: '755',
                                    link: true,
                                    parents: true,
                                    excludes: ['.git', 'node_modules']
                                }

                                const copyInstruction = new CopyInstruction(copyParams)

                                expect(copyInstruction.toString()).toBe(
                                    'COPY --from=workspace --chown=54321:54321 --chmod=755 --link --exclude=.git --exclude=node_modules . .'
                                )
                            })

                            test(`create a instruction and set from`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                copyInstruction.setFrom('workspace')

                                expect(copyInstruction.toString()).toBe('COPY --from=workspace . .')
                            })

                            test(`create a instruction and set from from stage`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                const workspaceStage = new Stage('scratch')

                                copyInstruction.setFrom(workspaceStage)

                                expect(copyInstruction.toString()).toBe(`COPY --from=${workspaceStage.id} . .`)
                            })

                            test(`create a instruction and set chown by user`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                copyInstruction.setChown('user')

                                expect(copyInstruction.toString()).toBe('COPY --chown=user . .')
                            })

                            test(`create a instruction and set chown by user and group`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                copyInstruction.setChown('user:group')

                                expect(copyInstruction.toString()).toBe('COPY --chown=user:group . .')
                            })

                            test(`create a instruction and set chmod to execute`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                copyInstruction.setChmod('755')

                                expect(copyInstruction.toString()).toBe('COPY --chmod=755 . .')
                            })

                            test(`create a instruction and set chmod to read`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                copyInstruction.setChmod('644')

                                expect(copyInstruction.toString()).toBe('COPY --chmod=644 . .')
                            })

                            test(`create a instruction and set chmod to execute with sticky bit`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                copyInstruction.setChmod('1755')

                                expect(copyInstruction.toString()).toBe('COPY --chmod=1755 . .')
                            })

                            test(`create a instruction, add from and set link without a value`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                copyInstruction.setFrom('workspace')

                                copyInstruction.setLink()

                                expect(copyInstruction.toString()).toBe('COPY --from=workspace --link . .')
                            })

                            test(`create a instruction, add from and set link to true`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                copyInstruction.setFrom('workspace')

                                copyInstruction.setLink(true)

                                expect(copyInstruction.toString()).toBe('COPY --from=workspace --link . .')
                            })

                            test(`create a instruction, add from and set link to false`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                copyInstruction.setFrom('workspace')

                                copyInstruction.setLink(true)
                                copyInstruction.setLink(false)

                                expect(copyInstruction.toString()).toBe('COPY --from=workspace . .')
                            })

                            test(`create a instruction, add from and set as linked`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                copyInstruction.setFrom('workspace')

                                copyInstruction.setLinked()

                                expect(copyInstruction.toString()).toBe('COPY --from=workspace --link . .')
                            })

                            test(`create a instruction, add from and set parents without a value`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                copyInstruction.setFrom('workspace')

                                copyInstruction.setParents()

                                expect(copyInstruction.toString()).toBe('COPY --from=workspace --parents . .')
                            })

                            test(`create a instruction, add from and set parents to true`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                copyInstruction.setFrom('workspace')

                                copyInstruction.setParents(true)

                                expect(copyInstruction.toString()).toBe('COPY --from=workspace --parents . .')
                            })

                            test(`create a instruction, add from and set parents to false`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                copyInstruction.setFrom('workspace')

                                copyInstruction.setParents(true)
                                copyInstruction.setParents(false)

                                expect(copyInstruction.toString()).toBe('COPY --from=workspace . .')
                            })

                            test(`create a instruction, add from and add exclude`, () => {
                                const copyInstruction = new CopyInstruction('.', '.')

                                copyInstruction.setFrom('workspace')

                                copyInstruction.addExclude('.git')

                                expect(copyInstruction.toString()).toBe('COPY --from=workspace --exclude=.git . .')
                            })

                            test(`don't create a instruction with a minimum valid object with invalid from`, () => {
                                const copyParams: CopyInstructionParamObject = {
                                    sources: '.',
                                    destination: '.',
                                    // @ts-expect-error wrong type
                                    from: null
                                }

                                expect(() => {
                                    const copyInstruction = new CopyInstruction(copyParams)

                                    copyInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage(`COPY`, [copyParams], ['Invalid input']))
                            })

                            test(`don't chown with an invalid parameter`, () => {
                                const testVal = 0

                                expect(() => {
                                    const copyInstruction = new CopyInstruction('.', '.')

                                    // @ts-expect-error invalid argument
                                    copyInstruction.setChown(testVal)
                                }).toThrow(/^Invalid input for setChown/)
                            })

                            test(`don't chmod with an invalid parameter`, () => {
                                const testVal = 0

                                expect(() => {
                                    const copyInstruction = new CopyInstruction('.', '.')

                                    // @ts-expect-error invalid argument
                                    copyInstruction.setChmod(testVal)
                                }).toThrow(/^Invalid input for setChmod/)
                            })

                            test(`don't link with an invalid parameter`, () => {
                                const testVal = 0

                                expect(() => {
                                    const copyInstruction = new CopyInstruction('.', '.')

                                    // @ts-expect-error invalid argument
                                    copyInstruction.setLink(testVal)
                                }).toThrow(/^Invalid input for setLink/)
                            })

                            test(`don't set parents with an invalid parameter`, () => {
                                const testVal = 0

                                expect(() => {
                                    const copyInstruction = new CopyInstruction('.', '.')

                                    // @ts-expect-error invalid argument
                                    copyInstruction.setParents(testVal)
                                }).toThrow(/^Invalid input for setParents/)
                            })

                            test(`don't add an exclude with an invalid parameter`, () => {
                                const testVal = 0

                                expect(() => {
                                    const copyInstruction = new CopyInstruction('.', '.')

                                    // @ts-expect-error invalid argument
                                    copyInstruction.addExclude(testVal)
                                }).toThrow(/^Invalid input for addExclude/)
                            })
                        })
                    })
                })
            })
        })
    })
})
