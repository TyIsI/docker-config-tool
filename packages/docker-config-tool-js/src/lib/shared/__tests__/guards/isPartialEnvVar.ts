import { isPartialEnvVar } from '../../guards'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`shared`, () => {
            describe(`guards`, () => {
                describe(`isPartialEnvVar`, () => {
                    test(`pass - default`, () => {
                        expect(isPartialEnvVar('TEST=test')).toBeTruthy()
                    })

                    test(`pass - key only`, () => {
                        expect(isPartialEnvVar('TEST')).toBeTruthy()
                    })

                    test(`pass - value with space`, () => {
                        expect(isPartialEnvVar('TEST=test value')).toBeTruthy()
                    })

                    test(`edge case - no value`, () => {
                        expect(isPartialEnvVar('TEST=')).toBeFalsy()
                    })

                    test(`edge case - numeric key`, () => {
                        expect(isPartialEnvVar('123')).toBeFalsy()
                    })

                    test(`edge case - numeric partial`, () => {
                        expect(isPartialEnvVar('123=')).toBeFalsy()
                    })

                    test(`edge case - null value`, () => {
                        expect(isPartialEnvVar(null)).toBeFalsy()
                    })

                    test(`edge case - empty object`, () => {
                        expect(isPartialEnvVar({})).toBeFalsy()
                    })

                    test(`edge case - empty string`, () => {
                        expect(isPartialEnvVar('')).toBeFalsy()
                    })

                    test(`edge case - empty array`, () => {
                        expect(isPartialEnvVar([])).toBeFalsy()
                    })

                    test(`edge case - array with empty string`, () => {
                        expect(isPartialEnvVar([''])).toBeFalsy()
                    })
                })
            })
        })
    })
})
