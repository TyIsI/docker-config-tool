import { generateInvalidArgumentErrorMessage } from '../../../../../shared/utils'
import { CmdInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`CMD`, () => {
                describe(`class`, () => {
                    describe(`methods`, () => {
                        describe(`addCmd`, () => {
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
})
