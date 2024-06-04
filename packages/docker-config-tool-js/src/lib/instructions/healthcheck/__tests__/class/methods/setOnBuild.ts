import { HealthCheckInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`HEALTHCHECK`, () => {
                describe(`class`, () => {
                    describe(`methods`, () => {
                        describe(`setOnBuild`, () => {
                            test(`create a instruction and set onbuild without arguments`, () => {
                                const healthcheckInstruction = new HealthCheckInstruction('/bin/true')

                                healthcheckInstruction.setOnBuild()

                                expect(healthcheckInstruction.toString()).toBe('ONBUILD HEALTHCHECK CMD ["/bin/true"]')
                            })

                            test(`create a instruction and set onbuild to true`, () => {
                                const healthcheckInstruction = new HealthCheckInstruction('/bin/true')

                                healthcheckInstruction.setOnBuild(true)

                                expect(healthcheckInstruction.toString()).toBe('ONBUILD HEALTHCHECK CMD ["/bin/true"]')
                            })

                            test(`create a instruction and set onbuild to true and then false`, () => {
                                const healthcheckInstruction = new HealthCheckInstruction('/bin/true')

                                healthcheckInstruction.setOnBuild(true)
                                healthcheckInstruction.setOnBuild(false)

                                expect(healthcheckInstruction.toString()).toBe('HEALTHCHECK CMD ["/bin/true"]')
                            })

                            test(`create a instruction and try to set onbuild with an invalid value`, () => {
                                expect(() => {
                                    const healthcheckInstruction = new HealthCheckInstruction('/bin/true')

                                    // @ts-expect-error invalid type
                                    healthcheckInstruction.setOnBuild('no')

                                    healthcheckInstruction.toString()
                                }).toThrow('Invalid HEALTHCHECK argument: string "no"')
                            })
                        })
                    })
                })
            })
        })
    })
})
