import { ShellInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`SHELL`, () => {
                describe(`class`, () => {
                    describe(`methods`, () => {
                        describe(`setOnBuild`, () => {
                            test(`create a instruction and set onbuild without arguments`, () => {
                                const shellInstruction = new ShellInstruction('/bin/true')

                                shellInstruction.setOnBuild()

                                expect(shellInstruction.toString()).toBe('ONBUILD SHELL ["/bin/true"]')
                            })

                            test(`create a instruction and set onbuild to true`, () => {
                                const shellInstruction = new ShellInstruction('/bin/true')

                                shellInstruction.setOnBuild(true)

                                expect(shellInstruction.toString()).toBe('ONBUILD SHELL ["/bin/true"]')
                            })

                            test(`create a instruction and set onbuild to true and then false`, () => {
                                const shellInstruction = new ShellInstruction('/bin/true')

                                shellInstruction.setOnBuild(true)
                                shellInstruction.setOnBuild(false)

                                expect(shellInstruction.toString()).toBe('SHELL ["/bin/true"]')
                            })

                            test(`create a instruction and try to set onbuild with an invalid value`, () => {
                                expect(() => {
                                    const shellInstruction = new ShellInstruction('/bin/true')

                                    // @ts-expect-error invalid type
                                    shellInstruction.setOnBuild('no')

                                    shellInstruction.toString()
                                }).toThrow('Invalid SHELL argument: string "no"')
                            })
                        })
                    })
                })
            })
        })
    })
})
