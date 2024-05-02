import { coerceStringArray } from '../../coerce'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`shared`, () => {
            describe(`coerce`, () => {
                describe(`coerceStringArray`, () => {
                    test(`pass - default`, () => {
                        const testVal = ['default']

                        expect(coerceStringArray(testVal[0])).toMatchObject(testVal)
                    })

                    test(`pass - default array`, () => {
                        const testVal = ['default']

                        expect(coerceStringArray(testVal)).toMatchObject(testVal)
                    })

                    test(`fail - empty array`, () => {
                        const testVal: string[] = []

                        expect(() => coerceStringArray(testVal)).toThrow('Invalid string array')
                    })

                    test(`fail - array with empty string value`, () => {
                        const testVal: string[] = ['']

                        expect(() => coerceStringArray(testVal)).toThrow('Invalid string array')
                    })

                    test(`fail - undefined value`, () => {
                        const testVal = undefined

                        expect(() => coerceStringArray(testVal)).toThrow('Invalid string array')
                    })

                    test(`fail - array with undefined value`, () => {
                        const testVal = [undefined]

                        expect(() => coerceStringArray(testVal)).toThrow('Invalid string array')
                    })

                    test(`fail - false value`, () => {
                        const testVal = false

                        expect(() => coerceStringArray(testVal)).toThrow('Invalid string array')
                    })
                })
            })
        })
    })
})
