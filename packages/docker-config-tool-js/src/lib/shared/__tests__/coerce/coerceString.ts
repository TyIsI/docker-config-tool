import { coerceString } from '../../coerce'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`shared`, () => {
            describe(`coerce`, () => {
                describe(`coerceString`, () => {
                    test(`pass - default`, () => {
                        const testVal = '1777'

                        expect(coerceString(testVal)).toBe(testVal)
                    })

                    test(`pass - numeric value`, () => {
                        const testVal = 1777

                        expect(coerceString(testVal)).toBe(String(testVal))
                    })
                })
            })
        })
    })
})
