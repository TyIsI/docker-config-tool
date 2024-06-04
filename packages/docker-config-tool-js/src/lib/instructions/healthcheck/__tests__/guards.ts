import {
    isHealthCheckCmdsNone,
    isHealthCheckCmdsParam,
    isHealthCheckCmdsString,
    isHealthCheckCmdsStringArray,
    isHealthCheckDurationParam,
    isHealthCheckParams,
    isHealthCheckParamsObject,
    isHealthCheckRetriesParam
} from '../guards'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`HEALTHCHECK`, () => {
                describe(`guards`, () => {
                    describe(`isHealthCheckCmdsNone`, () => {
                        test(`should expose a function`, () => {
                            expect(isHealthCheckCmdsNone).toBeDefined()
                        })

                        test(`isHealthCheckCmdsNone should return expected output`, () => {
                            const retValue = isHealthCheckCmdsNone('NONE')

                            expect(retValue).toBeTruthy()
                        })
                    })

                    describe(`isHealthCheckCmdsString`, () => {
                        test(`should expose a function`, () => {
                            expect(isHealthCheckCmdsString).toBeDefined()
                        })

                        test(`isHealthCheckCmdsString should return expected output`, () => {
                            const retValue = isHealthCheckCmdsString('value')

                            expect(retValue).toBeTruthy()
                        })
                    })

                    describe(`isHealthCheckCmdsStringArray`, () => {
                        test(`should expose a function`, () => {
                            expect(isHealthCheckCmdsStringArray).toBeDefined()
                        })

                        test(`isHealthCheckCmdsStringArray should return expected output`, () => {
                            const retValue = isHealthCheckCmdsStringArray(['value'])

                            expect(retValue).toBeTruthy()
                        })
                    })

                    describe(`isHealthCheckCmdsParam`, () => {
                        test(`should expose a function`, () => {
                            expect(isHealthCheckCmdsParam).toBeDefined()
                        })

                        test(`isHealthCheckCmdsParam should return expected output`, () => {
                            const retValue = isHealthCheckCmdsParam('value')

                            expect(retValue).toBeTruthy()
                        })
                    })

                    describe(`isHealthCheckDurationParam`, () => {
                        test(`should expose a function`, () => {
                            expect(isHealthCheckDurationParam).toBeDefined()
                        })

                        test(`isHealthCheckDurationParam should return expected output`, () => {
                            const retValue = isHealthCheckDurationParam('10s')

                            expect(retValue).toBeTruthy()
                        })
                    })

                    describe(`isHealthCheckRetriesParam`, () => {
                        test(`should expose a function`, () => {
                            expect(isHealthCheckRetriesParam).toBeDefined()
                        })

                        test(`isHealthCheckRetriesParam should return expected output`, () => {
                            const retValue = isHealthCheckRetriesParam(10)

                            expect(retValue).toBeTruthy()
                        })
                    })

                    describe(`isHealthCheckParamsObject`, () => {
                        test(`should expose a function`, () => {
                            expect(isHealthCheckParamsObject).toBeDefined()
                        })

                        test(`isHealthCheckParamsObject should return expected output`, () => {
                            const retValue = isHealthCheckParamsObject({ cmds: 'run' })

                            expect(retValue).toBeTruthy()
                        })
                    })

                    describe(`isHealthCheckParams`, () => {
                        test(`should expose a function`, () => {
                            expect(isHealthCheckParams).toBeDefined()
                        })

                        test(`isHealthCheckParams should return expected output`, () => {
                            const retValue = isHealthCheckParams('value')

                            expect(retValue).toBeTruthy()
                        })
                    })
                })
            })
        })
    })
})
