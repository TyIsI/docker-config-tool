import { generateConstructorErrorMessage } from '../../../../../shared/utils'
import { CmdInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`CMD`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        describe(`common`, () => {
                            test(`base properties`, () => {
                                const cmdInstruction = new CmdInstruction('/bin/true')

                                expect(cmdInstruction.type).toBe('instruction')
                                expect(cmdInstruction.instruction).toBe('CMD')
                                expect(cmdInstruction.toString()).toBe(`CMD ["/bin/true"]`)
                            })

                            test(`create instruction with a simple value`, () => {
                                const cmdInstruction = new CmdInstruction('/bin/echo test')

                                expect(cmdInstruction.toString()).toBe(`CMD ["/bin/echo","test"]`)
                            })

                            test(`create a instruction with a multi-part value`, () => {
                                const cmdInstruction = new CmdInstruction('/bin/echo', 'test')

                                expect(cmdInstruction.toString()).toBe(`CMD ["/bin/echo","test"]`)
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
                        })
                    })
                })
            })
        })
    })
})
