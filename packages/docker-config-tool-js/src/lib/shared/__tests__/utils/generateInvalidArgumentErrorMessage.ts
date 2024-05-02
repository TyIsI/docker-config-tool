import { generateInvalidArgumentErrorMessage } from '../../utils'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`shared`, () => {
            describe(`utils`, () => {
                describe(`generateInvalidArgumentErrorMessage`, () => {
                    test(`generateInvalidArgumentErrorMessage without arguments`, () => {
                        // @ts-expect-error missing
                        expect(() => generateInvalidArgumentErrorMessage()).toThrow()
                    })

                    test(`generateInvalidArgumentErrorMessage with base instruction argument`, () => {
                        const cmdId = 'TEST'

                        expect(generateInvalidArgumentErrorMessage(cmdId)).toMatch(`Invalid ${cmdId} argument:`)
                    })

                    test(`generateInvalidArgumentErrorMessage with argument (1)`, () => {
                        const cmdId = 'TEST'

                        const testVal = undefined

                        expect(generateInvalidArgumentErrorMessage(cmdId, testVal)).toMatch(
                            `Invalid ${cmdId} argument: ${typeof testVal} ${JSON.stringify(testVal)}`
                        )
                    })

                    test(`generateInvalidArgumentErrorMessage with argument (2)`, () => {
                        const cmdId = 'TEST'

                        const testVal1 = undefined
                        const testVal2 = {}

                        expect(generateInvalidArgumentErrorMessage(cmdId, testVal1, testVal2)).toMatch(
                            `Invalid ${cmdId} argument: ${typeof testVal1} ${JSON.stringify(testVal1)} ${typeof testVal2} ${JSON.stringify(testVal2)}`
                        )
                    })
                })
            })
        })
    })
})
