import { CmdInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`CMD`, () => {
                describe(`class`, () => {
                    describe(`methods`, () => {
                        describe(`setOnBuild`, () => {
                            test(`create a instruction and set onbuild without arguments`, () => {
                                const cmdInstruction = new CmdInstruction('/bin/true')

                                cmdInstruction.setOnBuild()

                                expect(cmdInstruction.toString()).toBe('ONBUILD CMD ["/bin/true"]')
                            })

                            test(`create a instruction and set onbuild to true`, () => {
                                const cmdInstruction = new CmdInstruction('/bin/true')

                                cmdInstruction.setOnBuild(true)

                                expect(cmdInstruction.toString()).toBe('ONBUILD CMD ["/bin/true"]')
                            })

                            test(`create a instruction and set onbuild to true and then false`, () => {
                                const cmdInstruction = new CmdInstruction('/bin/true')

                                cmdInstruction.setOnBuild(true)
                                cmdInstruction.setOnBuild(false)

                                expect(cmdInstruction.toString()).toBe('CMD ["/bin/true"]')
                            })

                            test(`create a instruction and try to set onbuild with an invalid value`, () => {
                                expect(() => {
                                    const cmdInstruction = new CmdInstruction('/bin/true')

                                    // @ts-expect-error invalid type
                                    cmdInstruction.setOnBuild('no')

                                    cmdInstruction.toString()
                                }).toThrow('Invalid CMD argument: string "no"')
                            })
                        })
                    })
                })
            })
        })
    })
})
