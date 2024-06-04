import { RunInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`RUN`, () => {
                describe(`class`, () => {
                    describe(`methods`, () => {
                        describe(`setOnBuild`, () => {
                            test(`create a instruction and set onbuild without arguments`, () => {
                                const runInstruction = new RunInstruction('/bin/true')

                                runInstruction.setOnBuild()

                                expect(runInstruction.toString()).toBe('ONBUILD RUN /bin/true')
                            })

                            test(`create a instruction and set onbuild to true`, () => {
                                const runInstruction = new RunInstruction('/bin/true')

                                runInstruction.setOnBuild(true)

                                expect(runInstruction.toString()).toBe('ONBUILD RUN /bin/true')
                            })

                            test(`create a instruction and set onbuild to true and then false`, () => {
                                const runInstruction = new RunInstruction('/bin/true')

                                runInstruction.setOnBuild(true)
                                runInstruction.setOnBuild(false)

                                expect(runInstruction.toString()).toBe('RUN /bin/true')
                            })

                            test(`create a instruction and try to set onbuild with an invalid value`, () => {
                                expect(() => {
                                    const runInstruction = new RunInstruction('/bin/true')

                                    // @ts-expect-error invalid type
                                    runInstruction.setOnBuild('no')

                                    runInstruction.toString()
                                }).toThrow('Invalid RUN argument: string "no"')
                            })
                        })
                    })
                })
            })
        })
    })
})
