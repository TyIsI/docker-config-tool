import { coerceFirstValue } from '../../coerce'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`shared`, () => {
            describe(`coerce`, () => {
                describe(`coerceFirstValue`, () => {
                    test(`pass - default`, () => {
                        const testVal = [1777]

                        expect(coerceFirstValue<number>(...testVal)).toBe(testVal[0])
                    })

                    test(`pass - skip first entry`, () => {
                        const testVal = [null, 1777]

                        expect(coerceFirstValue<number>(...testVal)).toBe(testVal[1])
                    })

                    test(`edge case - empty`, () => {
                        expect(() => coerceFirstValue<number>()).toThrow('Not a valid array')
                    })

                    test(`edge case - empty`, () => {
                        expect(() => coerceFirstValue<number>(null, undefined, null)).toThrow(
                            'No non null array elements'
                        )
                    })
                })
            })
        })
    })
})
