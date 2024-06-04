import { ExposeInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`EXPOSE`, () => {
                describe(`class`, () => {
                    describe(`methods`, () => {
                        describe(`setOnBuild`, () => {
                            test(`create a instruction and set onbuild without arguments`, () => {
                                const exposeInstruction = new ExposeInstruction('80/tcp')

                                exposeInstruction.setOnBuild()

                                expect(exposeInstruction.toString()).toBe('ONBUILD EXPOSE 80/tcp')
                            })

                            test(`create a instruction and set onbuild to true`, () => {
                                const exposeInstruction = new ExposeInstruction('80/tcp')

                                exposeInstruction.setOnBuild(true)

                                expect(exposeInstruction.toString()).toBe('ONBUILD EXPOSE 80/tcp')
                            })

                            test(`create a instruction and set onbuild to true and then false`, () => {
                                const exposeInstruction = new ExposeInstruction('80/tcp')

                                exposeInstruction.setOnBuild(true)
                                exposeInstruction.setOnBuild(false)

                                expect(exposeInstruction.toString()).toBe('EXPOSE 80/tcp')
                            })

                            test(`create a instruction and try to set onbuild with an invalid value`, () => {
                                expect(() => {
                                    const exposeInstruction = new ExposeInstruction('80/tcp')

                                    // @ts-expect-error invalid type
                                    exposeInstruction.setOnBuild('no')

                                    exposeInstruction.toString()
                                }).toThrow('Invalid EXPOSE argument: string "no"')
                            })
                        })
                    })
                })
            })
        })
    })
})
