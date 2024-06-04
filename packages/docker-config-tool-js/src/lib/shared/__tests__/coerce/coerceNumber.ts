import { coerceNumber } from '../../coerce'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`shared`, () => {
            describe(`coerce`, () => {
                describe(`coerceNumber`, () => {
                    test(`pass - default`, () => {
                        const testVal = 1777

                        expect(coerceNumber(testVal)).toBe(testVal)
                    })

                    test(`pass - string`, () => {
                        const testVal = 1777

                        expect(coerceNumber(testVal.toString())).toBe(testVal)
                    })

                    test(`edge case - undefined`, () => {
                        const testVal = undefined

                        expect(() => coerceNumber(testVal)).toThrow('Invalid number: ')
                    })
                })
            })
        })
    })
})
