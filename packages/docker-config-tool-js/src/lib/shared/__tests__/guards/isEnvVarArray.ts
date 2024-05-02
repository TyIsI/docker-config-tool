import { isEnvVarArray } from '../../guards'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`shared`, () => {
            describe(`guards`, () => {
                describe(`isEnvVarArray`, () => {
                    test(`pass - default`, () => {
                        expect(isEnvVarArray(['TEST=test'])).toBeTruthy()
                    })

                    test(`edge case - key only`, () => {
                        expect(isEnvVarArray(['TEST'])).toBeFalsy()
                    })

                    test(`edge case - no value`, () => {
                        expect(isEnvVarArray(['TEST='])).toBeFalsy()
                    })

                    test(`edge case - numeric key`, () => {
                        expect(isEnvVarArray(['123'])).toBeFalsy()
                    })

                    test(`edge case - numeric partial`, () => {
                        expect(isEnvVarArray(['123='])).toBeFalsy()
                    })

                    test(`edge case - null value`, () => {
                        expect(isEnvVarArray(null)).toBeFalsy()
                    })

                    test(`edge case - empty object`, () => {
                        expect(isEnvVarArray({})).toBeFalsy()
                    })

                    test(`edge case - empty array`, () => {
                        expect(isEnvVarArray([])).toBeFalsy()
                    })

                    test(`edge case - array with empty string`, () => {
                        expect(isEnvVarArray([''])).toBeFalsy()
                    })
                })
            })
        })
    })
})
