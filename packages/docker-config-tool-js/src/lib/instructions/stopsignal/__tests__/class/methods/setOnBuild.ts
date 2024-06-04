import { StopSignalInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`STOPSIGNAL`, () => {
                describe(`class`, () => {
                    describe(`methods`, () => {
                        describe(`setOnBuild`, () => {
                            test(`create a instruction and set onbuild without arguments`, () => {
                                const stopsignalInstruction = new StopSignalInstruction('SIGTERM')

                                stopsignalInstruction.setOnBuild()

                                expect(stopsignalInstruction.toString()).toBe('ONBUILD STOPSIGNAL SIGTERM')
                            })

                            test(`create a instruction and set onbuild to true`, () => {
                                const stopsignalInstruction = new StopSignalInstruction('SIGTERM')

                                stopsignalInstruction.setOnBuild(true)

                                expect(stopsignalInstruction.toString()).toBe('ONBUILD STOPSIGNAL SIGTERM')
                            })

                            test(`create a instruction and set onbuild to true and then false`, () => {
                                const stopsignalInstruction = new StopSignalInstruction('SIGTERM')

                                stopsignalInstruction.setOnBuild(true)
                                stopsignalInstruction.setOnBuild(false)

                                expect(stopsignalInstruction.toString()).toBe('STOPSIGNAL SIGTERM')
                            })

                            test(`create a instruction and try to set onbuild with an invalid value`, () => {
                                expect(() => {
                                    const stopsignalInstruction = new StopSignalInstruction('SIGTERM')

                                    // @ts-expect-error invalid type
                                    stopsignalInstruction.setOnBuild('no')

                                    stopsignalInstruction.toString()
                                }).toThrow('Invalid STOPSIGNAL argument: string "no"')
                            })
                        })
                    })
                })
            })
        })
    })
})
