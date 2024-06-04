import { EnvInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`ENV`, () => {
                describe(`class`, () => {
                    describe(`methods`, () => {
                        describe(`setOnBuild`, () => {
                            test(`create a instruction and set onbuild without arguments`, () => {
                                const envInstruction = new EnvInstruction('TEST=test')

                                envInstruction.setOnBuild()

                                expect(envInstruction.toString()).toBe('ONBUILD ENV TEST=test')
                            })

                            test(`create a instruction and set onbuild to true`, () => {
                                const envInstruction = new EnvInstruction('TEST=test')

                                envInstruction.setOnBuild(true)

                                expect(envInstruction.toString()).toBe('ONBUILD ENV TEST=test')
                            })

                            test(`create a instruction and set onbuild to true and then false`, () => {
                                const envInstruction = new EnvInstruction('TEST=test')

                                envInstruction.setOnBuild(true)
                                envInstruction.setOnBuild(false)

                                expect(envInstruction.toString()).toBe('ENV TEST=test')
                            })

                            test(`create a instruction and try to set onbuild with an invalid value`, () => {
                                expect(() => {
                                    const envInstruction = new EnvInstruction('TEST=test')

                                    // @ts-expect-error invalid type
                                    envInstruction.setOnBuild('no')

                                    envInstruction.toString()
                                }).toThrow('Invalid ENV argument: string "no"')
                            })
                        })
                    })
                })
            })
        })
    })
})
