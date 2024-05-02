import { generateConstructorErrorMessage, generateInvalidArgumentErrorMessage } from '../../../../../shared/utils'
import { CmdInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`CMD`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        test(`create instruction with a simple value`, () => {
                            const cmdInstruction = new CmdInstruction('echo', 'test')

                            expect(cmdInstruction.toString()).toBe(`CMD ["echo","test"]`)
                        })

                        test(`create a instruction with a multi-part value`, () => {
                            const cmdInstruction = new CmdInstruction('echo', 'test')

                            expect(cmdInstruction.toString()).toBe(`CMD ["echo","test"]`)
                        })

                        test(`create instruction from string and add an extra output parameter`, () => {
                            const cmdInstruction = new CmdInstruction('echo test')

                            cmdInstruction.addCmd('--debug')

                            expect(cmdInstruction.toString()).toBe(`CMD ["echo","test","--debug"]`)
                        })

                        test(`create a instruction from multi-part value and add an extra output parameter`, () => {
                            const cmdInstruction = new CmdInstruction('echo', 'test')

                            cmdInstruction.addCmd('--debug')

                            expect(cmdInstruction.toString()).toBe(`CMD ["echo","test","--debug"]`)
                        })

                        test(`don't create from empty arguments`, () => {
                            expect(() => {
                                const cmdInstruction = new CmdInstruction()

                                cmdInstruction.toString()
                            }).toThrow(generateConstructorErrorMessage('CMD', []))
                        })

                        test(`don't create from empty string argument`, () => {
                            expect(() => {
                                const cmdInstruction = new CmdInstruction('')

                                cmdInstruction.toString()
                            }).toThrow(generateConstructorErrorMessage('CMD', ['']))
                        })

                        test(`don't create from empty string array argument`, () => {
                            expect(() => {
                                // @ts-expect-error invalid input
                                const cmdInstruction = new CmdInstruction([''])

                                cmdInstruction.toString()
                            }).toThrow(generateConstructorErrorMessage('CMD', [['']]))
                        })

                        test(`don't add empty instruction parameter`, () => {
                            expect(() => {
                                const cmdInstruction = new CmdInstruction('echo test')

                                // @ts-expect-error empty params
                                cmdInstruction.addCmd()

                                cmdInstruction.toString()
                            }).toThrow(`Invalid cmd argument: undefined undefined`)
                        })

                        test(`don't add empty string instruction parameter`, () => {
                            expect(() => {
                                const cmdInstruction = new CmdInstruction('echo', 'test')

                                cmdInstruction.addCmd('')

                                cmdInstruction.toString()
                            }).toThrow(`Invalid cmd argument: string ""`)
                        })

                        test(`don't add invalid instruction parameter`, () => {
                            const testVal = -1

                            expect(() => {
                                const cmdInstruction = new CmdInstruction('echo', 'test')

                                // @ts-expect-error undefined
                                cmdInstruction.addCmd(testVal)

                                cmdInstruction.toString()
                            }).toThrow(generateInvalidArgumentErrorMessage(`cmd`, testVal))
                        })
                    })
                })
            })
        })
    })
})
