import { ArgInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`ARG`, () => {
                describe(`class`, () => {
                    describe(`methods`, () => {
                        describe(`setOnBuild`, () => {
                            test(`create a instruction and set onbuild without arguments`, () => {
                                const argInstruction = new ArgInstruction('TEST=test')

                                argInstruction.setOnBuild()

                                expect(argInstruction.toString()).toBe('ONBUILD ARG TEST=test')
                            })

                            test(`create a instruction and set onbuild to true`, () => {
                                const argInstruction = new ArgInstruction('TEST=test')

                                argInstruction.setOnBuild(true)

                                expect(argInstruction.toString()).toBe('ONBUILD ARG TEST=test')
                            })

                            test(`create a instruction and set onbuild to true and then false`, () => {
                                const argInstruction = new ArgInstruction('TEST=test')

                                argInstruction.setOnBuild(true)
                                argInstruction.setOnBuild(false)

                                expect(argInstruction.toString()).toBe('ARG TEST=test')
                            })

                            test(`create a instruction and try to set onbuild with an invalid value`, () => {
                                expect(() => {
                                    const argInstruction = new ArgInstruction('TEST=test')

                                    // @ts-expect-error invalid type
                                    argInstruction.setOnBuild('no')

                                    argInstruction.toString()
                                }).toThrow('Invalid ARG argument: string "no"')
                            })
                        })
                    })
                })
            })
        })
    })
})
