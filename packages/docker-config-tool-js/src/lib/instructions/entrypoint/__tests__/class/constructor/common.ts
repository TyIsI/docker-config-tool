import { generateConstructorErrorMessage } from '../../../../../shared/utils'
import { EntryPointInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`ENTRYPOINT`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        describe(`common`, () => {
                            test(`create instruction with a simple value`, () => {
                                const entryPointInstruction = new EntryPointInstruction('echo test')

                                expect(entryPointInstruction.toString()).toBe(`ENTRYPOINT ["echo","test"]`)
                            })

                            test(`create a instruction with a multi-part value`, () => {
                                const entryPointInstruction = new EntryPointInstruction('echo', 'test')

                                expect(entryPointInstruction.toString()).toBe(`ENTRYPOINT ["echo","test"]`)
                            })

                            test(`add an extra argument`, () => {
                                const entryPointInstruction = new EntryPointInstruction('echo')

                                entryPointInstruction.addEntrypointArg('test')

                                expect(entryPointInstruction.toString()).toBe(`ENTRYPOINT ["echo","test"]`)
                            })

                            test(`don't create with no input`, () => {
                                expect(() => {
                                    const entryPointInstruction = new EntryPointInstruction()

                                    entryPointInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('ENTRYPOINT', []))
                            })

                            test(`don't create with empty input`, () => {
                                expect(() => {
                                    const entryPointInstruction = new EntryPointInstruction('')

                                    entryPointInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('ENTRYPOINT', ['']))
                            })

                            test(`don't add undefined entrypoint arguments`, () => {
                                expect(() => {
                                    const entryPointInstruction = new EntryPointInstruction('echo', 'test')

                                    // @ts-expect-error empty
                                    entryPointInstruction.addEntrypointArg()
                                }).toThrow(/^Invalid entrypoint argument/)
                            })

                            test(`don't add empty entrypoint arguments`, () => {
                                expect(() => {
                                    const entryPointInstruction = new EntryPointInstruction('echo', 'test')

                                    entryPointInstruction.addEntrypointArg('')

                                    entryPointInstruction.toString()
                                }).toThrow(/^Invalid entrypoint argument/)
                            })
                        })
                    })
                })
            })
        })
    })
})
