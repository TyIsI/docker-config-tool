import { generateConstructorErrorMessage } from '../../utils'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`shared`, () => {
            describe(`utils`, () => {
                describe(`generateConstructorErrorMessage`, () => {
                    test(`generateConstructorErrorMessage without arguments`, () => {
                        // @ts-expect-error missing
                        expect(() => generateConstructorErrorMessage()).toThrow()
                    })

                    test(`generateConstructorErrorMessage with base instruction argument`, () => {
                        const cmdId = 'TEST'

                        expect(generateConstructorErrorMessage(cmdId)).toMatch(
                            `Invalid or missing arguments while attempting to create new ${cmdId} instance:`
                        )
                    })

                    test(`generateConstructorErrorMessage with argument (1)`, () => {
                        const cmdId = 'TEST'

                        const testVal = undefined

                        expect(generateConstructorErrorMessage(cmdId, testVal)).toMatch(
                            `Invalid or missing arguments while attempting to create new ${cmdId} instance: ${typeof testVal} ${JSON.stringify(testVal)}`
                        )
                    })

                    test(`generateConstructorErrorMessage with argument (2)`, () => {
                        const cmdId = 'TEST'

                        const testVal1 = undefined
                        const testVal2 = {}

                        expect(generateConstructorErrorMessage(cmdId, testVal1, testVal2)).toMatch(
                            `Invalid or missing arguments while attempting to create new ${cmdId} instance: ${typeof testVal1} ${JSON.stringify(testVal1)} ${typeof testVal2} ${JSON.stringify(testVal2)}`
                        )
                    })
                })
            })
        })
    })
})
