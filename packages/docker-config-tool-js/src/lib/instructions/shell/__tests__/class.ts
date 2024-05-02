import { generateConstructorErrorMessage, generateInvalidArgumentErrorMessage } from '../../../shared/utils'
import { ShellInstruction } from '../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`SHELL`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        test(`create instruction with a simple value`, () => {
                            const shellInstruction = new ShellInstruction('echo test')

                            expect(shellInstruction.toString()).toBe(`SHELL ["echo","test"]`)
                        })

                        test(`create a instruction with a multi-part value`, () => {
                            const shellInstruction = new ShellInstruction('echo', 'test')

                            expect(shellInstruction.toString()).toBe(`SHELL ["echo","test"]`)
                        })
                    })

                    describe(`methods`, () => {
                        describe(`addShell`, () => {
                            test(`create instruction from string and add an extra output parameter`, () => {
                                const shellInstruction = new ShellInstruction('echo test')

                                shellInstruction.addShell('--debug')

                                expect(shellInstruction.toString()).toBe(`SHELL ["echo","test","--debug"]`)
                            })

                            test(`create a instruction from multi-part value and add an extra output parameter`, () => {
                                const shellInstruction = new ShellInstruction('echo', 'test')

                                shellInstruction.addShell('--debug')

                                expect(shellInstruction.toString()).toBe(`SHELL ["echo","test","--debug"]`)
                            })

                            test(`don't create from empty arguments`, () => {
                                expect(() => {
                                    const shellInstruction = new ShellInstruction()

                                    shellInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('SHELL', []))
                            })

                            test(`don't create from empty string argument`, () => {
                                expect(() => {
                                    const shellInstruction = new ShellInstruction('')

                                    shellInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('SHELL', ['']))
                            })

                            test(`don't create from empty string array argument`, () => {
                                expect(() => {
                                    // @ts-expect-error invalid input
                                    const shellInstruction = new ShellInstruction([''])

                                    shellInstruction.toString()
                                }).toThrow(generateConstructorErrorMessage('SHELL', [['']]))
                            })

                            test(`don't add empty instruction parameter`, () => {
                                expect(() => {
                                    const shellInstruction = new ShellInstruction('echo test')

                                    // @ts-expect-error empty params
                                    shellInstruction.addShell()

                                    shellInstruction.toString()
                                }).toThrow(generateInvalidArgumentErrorMessage(`shell`, undefined))
                            })

                            test(`don't add empty string instruction parameter`, () => {
                                expect(() => {
                                    const shellInstruction = new ShellInstruction('echo', 'test')

                                    shellInstruction.addShell('')

                                    shellInstruction.toString()
                                }).toThrow(generateInvalidArgumentErrorMessage(`shell`, ''))
                            })

                            test(`don't add invalid instruction parameter`, () => {
                                const testVal = -1

                                expect(() => {
                                    const shellInstruction = new ShellInstruction('echo', 'test')

                                    // @ts-expect-error undefined
                                    shellInstruction.addShell(testVal)

                                    shellInstruction.toString()
                                }).toThrow(generateInvalidArgumentErrorMessage(`shell`, testVal))
                            })
                        })
                    })
                })
            })
        })
    })
})
