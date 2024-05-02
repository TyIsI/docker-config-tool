import { isTrueBoolean } from '../../guards'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`shared`, () => {
            describe(`guards`, () => {
                describe(`isTrueBoolean`, () => {
                    test(`pass - default`, () => {
                        expect(isTrueBoolean(true)).toBeTruthy()
                    })

                    test(`edge case - false`, () => {
                        expect(isTrueBoolean(false)).toBeFalsy()
                    })

                    test(`edge case - null value`, () => {
                        expect(isTrueBoolean(null)).toBeFalsy()
                    })
                })
            })
        })
    })
})
