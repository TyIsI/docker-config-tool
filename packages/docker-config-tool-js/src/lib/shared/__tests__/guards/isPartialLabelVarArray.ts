import { isPartialLabelVarArray } from '../../guards'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`shared`, () => {
            describe(`guards`, () => {
                describe(`isPartialLabelVarArray`, () => {
                    test(`pass - default`, () => {
                        expect(isPartialLabelVarArray(['TEST=test'])).toBeTruthy()
                    })

                    test(`pass - key only`, () => {
                        expect(isPartialLabelVarArray(['TEST'])).toBeTruthy()
                    })

                    test(`pass - value with space`, () => {
                        expect(isPartialLabelVarArray(['TEST=test value'])).toBeTruthy()
                    })

                    test(`edge case - no value`, () => {
                        expect(isPartialLabelVarArray(['TEST='])).toBeFalsy()
                    })

                    test(`edge case - numeric key`, () => {
                        expect(isPartialLabelVarArray(['123'])).toBeFalsy()
                    })

                    test(`edge case - numeric partial`, () => {
                        expect(isPartialLabelVarArray(['123='])).toBeFalsy()
                    })

                    test(`edge case - null value`, () => {
                        expect(isPartialLabelVarArray(null)).toBeFalsy()
                    })

                    test(`edge case - empty object`, () => {
                        expect(isPartialLabelVarArray({})).toBeFalsy()
                    })

                    test(`edge case - empty array`, () => {
                        expect(isPartialLabelVarArray([])).toBeFalsy()
                    })

                    test(`edge case - array with empty string`, () => {
                        expect(isPartialLabelVarArray([''])).toBeFalsy()
                    })
                })
            })
        })
    })
})
