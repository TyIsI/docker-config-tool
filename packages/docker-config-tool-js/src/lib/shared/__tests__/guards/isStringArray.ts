import { isStringArray } from '../../guards'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`shared`, () => {
            describe(`guards`, () => {
                describe(`isStringArray`, () => {
                    test(`pass - default`, () => {
                        expect(isStringArray(['test'])).toBeTruthy()
                    })

                    test(`edge case - empty array`, () => {
                        expect(isStringArray([])).toBeFalsy()
                    })

                    test(`edge case - array with false value`, () => {
                        expect(isStringArray([false])).toBeFalsy()
                    })

                    test(`edge case - array with empty string`, () => {
                        expect(isStringArray([''])).toBeFalsy()
                    })
                })
            })
        })
    })
})
