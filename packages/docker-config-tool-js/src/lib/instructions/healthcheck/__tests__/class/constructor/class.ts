import { generateConstructorErrorMessage } from '../../../../../shared/utils'
import { HealthCheckInstruction } from '../../../class'
import { type HealthCheckParamsObject } from '../../../types'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`HEALTHCHECK`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        test(`create instruction`, () => {
                            const healthCheckInstruction = new HealthCheckInstruction('/bin/true')

                            expect(healthCheckInstruction.toString()).toBe('HEALTHCHECK CMD ["/bin/true"]')
                        })

                        test(`create instruction with array`, () => {
                            const healthCheckInstruction = new HealthCheckInstruction(['/bin/true'])

                            expect(healthCheckInstruction.toString()).toBe('HEALTHCHECK CMD ["/bin/true"]')
                        })

                        test(`create instruction with full object`, () => {
                            const testVal: HealthCheckParamsObject = {
                                instruction: ['/bin/true'],
                                interval: '30s',
                                timeout: '30s',
                                startPeriod: '0s',
                                startInterval: '5s',
                                retries: 3
                            }

                            const healthCheckInstruction = new HealthCheckInstruction(testVal)

                            expect(healthCheckInstruction.toString()).toBe(
                                'HEALTHCHECK --interval=30s --timeout=30s --start-period=0s --start-interval=5s --retries=3 CMD ["/bin/true"]'
                            )
                        })

                        test(`create instruction with full object (with simple instruction string)`, () => {
                            const testVal: HealthCheckParamsObject = {
                                instruction: '/bin/true',
                                interval: '30s',
                                timeout: '30s',
                                startPeriod: '0s',
                                startInterval: '5s',
                                retries: 3
                            }

                            const healthCheckInstruction = new HealthCheckInstruction(testVal)

                            expect(healthCheckInstruction.toString()).toBe(
                                'HEALTHCHECK --interval=30s --timeout=30s --start-period=0s --start-interval=5s --retries=3 CMD ["/bin/true"]'
                            )
                        })

                        test(`create instruction with special NONE instruction`, () => {
                            const healthCheckInstruction = new HealthCheckInstruction('NONE')

                            expect(healthCheckInstruction.toString()).toBe('HEALTHCHECK NONE')
                        })

                        test(`create instruction and add an additional instruction`, () => {
                            const healthCheckInstruction = new HealthCheckInstruction('/bin/sh')

                            healthCheckInstruction.addHealthCheckInstruction('-c')

                            expect(healthCheckInstruction.toString()).toBe('HEALTHCHECK CMD ["/bin/sh","-c"]')
                        })

                        test(`don't create object with no arguments`, () => {
                            expect(() => {
                                // @ts-expect-error missing arg
                                const healthCheckInstruction = new HealthCheckInstruction()

                                healthCheckInstruction.toString()
                            }).toThrow(generateConstructorErrorMessage('HEALTHCHECK', undefined, ['Invalid input']))
                        })

                        test(`don't create object with invalid interval argument`, () => {
                            const testVal: HealthCheckParamsObject = {
                                instruction: '/bin/true',
                                // @ts-expect-error invalid type
                                interval: 30
                            }

                            expect(() => {
                                const healthCheckInstruction = new HealthCheckInstruction(testVal)

                                healthCheckInstruction.toString()
                            }).toThrow(generateConstructorErrorMessage('HEALTHCHECK', testVal, ['Invalid input']))
                        })

                        test(`don't create object with invalid timeout argument`, () => {
                            const testVal: HealthCheckParamsObject = {
                                instruction: '/bin/true',
                                // @ts-expect-error invalid type
                                timeout: 30
                            }

                            expect(() => {
                                const healthCheckInstruction = new HealthCheckInstruction(testVal)

                                healthCheckInstruction.toString()
                            }).toThrow(generateConstructorErrorMessage('HEALTHCHECK', testVal, ['Invalid input']))
                        })

                        test(`don't create object with invalid startPeriod argument`, () => {
                            const testVal: HealthCheckParamsObject = {
                                instruction: '/bin/true',
                                // @ts-expect-error invalid type
                                startPeriod: 30
                            }

                            expect(() => {
                                const healthCheckInstruction = new HealthCheckInstruction(testVal)

                                healthCheckInstruction.toString()
                            }).toThrow(generateConstructorErrorMessage('HEALTHCHECK', testVal, ['Invalid input']))
                        })

                        test(`don't create object with invalid startInterval argument`, () => {
                            const testVal: HealthCheckParamsObject = {
                                instruction: '/bin/true',
                                // @ts-expect-error invalid type
                                startInterval: 30
                            }

                            expect(() => {
                                const healthCheckInstruction = new HealthCheckInstruction(testVal)

                                healthCheckInstruction.toString()
                            }).toThrow(generateConstructorErrorMessage('HEALTHCHECK', testVal, ['Invalid input']))
                        })

                        test(`don't create object with invalid retries argument`, () => {
                            const testVal: HealthCheckParamsObject = {
                                instruction: '/bin/true',
                                // @ts-expect-error invalid type
                                retries: '30s'
                            }

                            expect(() => {
                                const healthCheckInstruction = new HealthCheckInstruction(testVal)

                                healthCheckInstruction.toString()
                            }).toThrow(generateConstructorErrorMessage('HEALTHCHECK', testVal, ['Invalid input']))
                        })

                        test(`don't add instruction with missing argument`, () => {
                            expect(() => {
                                const healthCheckInstruction = new HealthCheckInstruction('/bin/sh')

                                // @ts-expect-error missing argument
                                healthCheckInstruction.addHealthCheckInstruction()

                                healthCheckInstruction.toString()
                            }).toThrow(`Invalid healthcheck argument: undefined`)
                        })

                        test(`don't add instruction with empty argument`, () => {
                            expect(() => {
                                const healthCheckInstruction = new HealthCheckInstruction('/bin/sh')

                                healthCheckInstruction.addHealthCheckInstruction('')

                                healthCheckInstruction.toString()
                            }).toThrow(`Invalid healthcheck argument: ""`)
                        })
                    })
                })
            })
        })
    })
})
