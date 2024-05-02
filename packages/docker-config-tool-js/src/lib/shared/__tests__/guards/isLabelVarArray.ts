import { isLabelVarArray } from '../../guards'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`shared`, () => {
            describe(`guards`, () => {
                describe(`isLabelVarArray`, () => {
                    test(`pass - default`, () => {
                        expect(isLabelVarArray(['TEST=test'])).toBeTruthy()
                    })

                    test(`edge case - key only`, () => {
                        expect(isLabelVarArray(['TEST'])).toBeFalsy()
                    })

                    test(`edge case - no value`, () => {
                        expect(isLabelVarArray(['TEST='])).toBeFalsy()
                    })

                    test(`edge case - numeric key`, () => {
                        expect(isLabelVarArray(['123'])).toBeFalsy()
                    })

                    test(`edge case - numeric partial`, () => {
                        expect(isLabelVarArray(['123='])).toBeFalsy()
                    })

                    test(`edge case - null value`, () => {
                        expect(isLabelVarArray(null)).toBeFalsy()
                    })

                    test(`edge case - empty object`, () => {
                        expect(isLabelVarArray({})).toBeFalsy()
                    })

                    test(`edge case - empty array`, () => {
                        expect(isLabelVarArray([])).toBeFalsy()
                    })

                    test(`edge case - array with empty string`, () => {
                        expect(isLabelVarArray([''])).toBeFalsy()
                    })
                })
            })
        })
    })
})
