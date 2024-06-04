import { generateConstructorErrorMessage } from '../../../../../shared/utils'
import { AddInstruction } from '../../../class'
import { type AddInstructionParamObject } from '../../../types'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`ADD`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        describe(`common`, () => {
                            test(`base properties`, () => {
                                const addInstruction = new AddInstruction('.', '.')

                                expect(addInstruction.type).toBe('instruction')
                                expect(addInstruction.instruction).toBe('ADD')
                            })

                            test(`create a instruction with a source and destination`, () => {
                                const addInstruction = new AddInstruction('.', '.')

                                expect(addInstruction.toString()).toBe('ADD . .')
                            })

                            test(`create a instruction with multiple sources and a destination`, () => {
                                const addInstruction = new AddInstruction('package.json', 'pnpm-lock.yaml', '.')

                                expect(addInstruction.toString()).toBe('ADD package.json pnpm-lock.yaml .')
                            })

                            test(`creating a instruction with an invalid source and destination should fail`, () => {
                                expect(() => {
                                    // @ts-expect-error not string
                                    const addInstruction = new AddInstruction(false, true)

                                    addInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('ADD', [false, true], ['Invalid input']))
                            })

                            test(`creating a instruction with a minimum valid object`, () => {
                                const addParams: AddInstructionParamObject = {
                                    sources: '.',
                                    destination: '.'
                                }

                                const addInstruction = new AddInstruction(addParams)

                                expect(addInstruction.toString()).toBe('ADD . .')
                            })

                            test(`creating a instruction with a minimum valid object with multiple sources`, () => {
                                const addParams: AddInstructionParamObject = {
                                    sources: ['package.json', 'pnpm-lock.yaml'],
                                    destination: '.'
                                }

                                const addInstruction = new AddInstruction(addParams)

                                expect(addInstruction.toString()).toBe('ADD package.json pnpm-lock.yaml .')
                            })

                            test(`creating a instruction with a full valid object`, () => {
                                const addParams: AddInstructionParamObject = {
                                    sources: '.',
                                    destination: '.',
                                    keepGitDir: true,
                                    checksum: 'sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
                                    chown: '54321:54321',
                                    chmod: '755',
                                    link: true,
                                    exclude: '.git',
                                    excludes: ['node_modules']
                                }

                                const addInstruction = new AddInstruction(addParams)

                                expect(addInstruction.toString()).toBe(
                                    'ADD --keepGitDir --checksum=sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef --chown=54321:54321 --chmod=755 --link --exclude=.git --exclude=node_modules . .'
                                )
                            })

                            test(`creating a instruction with a full valid object and multiple sources`, () => {
                                const addParams: AddInstructionParamObject = {
                                    sources: ['package.json', 'pnpm-lock.yaml'],
                                    destination: '.',
                                    keepGitDir: true,
                                    checksum: 'sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
                                    chown: '54321:54321',
                                    chmod: '755',
                                    link: true,
                                    exclude: '.git',
                                    excludes: ['node_modules']
                                }

                                const addInstruction = new AddInstruction(addParams)

                                expect(addInstruction.toString()).toBe(
                                    'ADD --keepGitDir --checksum=sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef --chown=54321:54321 --chmod=755 --link --exclude=.git --exclude=node_modules package.json pnpm-lock.yaml .'
                                )
                            })

                            test(`creating a instruction with a full valid object minus exclude opt`, () => {
                                const addParams: AddInstructionParamObject = {
                                    sources: '.',
                                    destination: '.',
                                    keepGitDir: true,
                                    checksum: 'sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
                                    chown: '54321:54321',
                                    chmod: '755',
                                    link: true,
                                    excludes: ['.git', 'node_modules']
                                }

                                const addInstruction = new AddInstruction(addParams)

                                expect(addInstruction.toString()).toBe(
                                    'ADD --keepGitDir --checksum=sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef --chown=54321:54321 --chmod=755 --link --exclude=.git --exclude=node_modules . .'
                                )
                            })

                            test(`creating a instruction with a minimum valid object with invalid checksum`, () => {
                                const testParams: AddInstructionParamObject = {
                                    sources: '.',
                                    destination: '.',
                                    checksum: '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'
                                }

                                expect(() => {
                                    const addInstruction = new AddInstruction(testParams)

                                    addInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage(`ADD`, [testParams], ['Invalid checksum']))
                            })
                        })
                    })
                })
            })
        })
    })
})
