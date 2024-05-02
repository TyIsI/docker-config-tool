import { isNumberArray } from '../../guards'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`shared`, () => {
            describe(`guards`, () => {
                describe(`isNumberArray`, () => {
                    test(`pass - default`, () => {
                        expect(isNumberArray([1])).toBeTruthy()
                    })

                    test(`edge case - partial string`, () => {
                        expect(isNumberArray(['1', 2])).toBeFalsy()
                    })

                    test(`edge case - strings`, () => {
                        expect(isNumberArray(['1', '2'])).toBeFalsy()
                    })

                    test(`edge case - empty array`, () => {
                        expect(isNumberArray([])).toBeFalsy()
                    })

                    test(`edge case - array with null value`, () => {
                        expect(isNumberArray([null])).toBeFalsy()
                    })
                })
            })
        })
    })
})
