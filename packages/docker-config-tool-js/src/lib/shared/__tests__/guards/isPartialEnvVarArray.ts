import { isPartialEnvVarArray } from '../../guards'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`shared`, () => {
            describe(`guards`, () => {
                describe(`isPartialEnvVarArray`, () => {
                    test(`pass - default`, () => {
                        expect(isPartialEnvVarArray(['TEST=test'])).toBeTruthy()
                    })

                    test(`pass - key only`, () => {
                        expect(isPartialEnvVarArray(['TEST'])).toBeTruthy()
                    })

                    test(`pass - value with space`, () => {
                        expect(isPartialEnvVarArray(['TEST=test value'])).toBeTruthy()
                    })

                    test(`edge case - no value`, () => {
                        expect(isPartialEnvVarArray(['TEST='])).toBeFalsy()
                    })

                    test(`edge case - numeric key`, () => {
                        expect(isPartialEnvVarArray(['123'])).toBeFalsy()
                    })

                    test(`edge case - numeric partial`, () => {
                        expect(isPartialEnvVarArray(['123='])).toBeFalsy()
                    })

                    test(`edge case - null value`, () => {
                        expect(isPartialEnvVarArray(null)).toBeFalsy()
                    })

                    test(`edge case - empty object`, () => {
                        expect(isPartialEnvVarArray({})).toBeFalsy()
                    })

                    test(`edge case - empty array`, () => {
                        expect(isPartialEnvVarArray([])).toBeFalsy()
                    })

                    test(`edge case - array with empty string`, () => {
                        expect(isPartialEnvVarArray([''])).toBeFalsy()
                    })
                })
            })
        })
    })
})
