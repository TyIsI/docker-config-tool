import { isEnvVar } from '../../guards'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`shared`, () => {
            describe(`guards`, () => {
                describe(`isEnvVar`, () => {
                    test(`pass - default`, () => {
                        expect(isEnvVar('TEST=test')).toBeTruthy()
                    })

                    test(`edge case - key only`, () => {
                        expect(isEnvVar('TEST')).toBeFalsy()
                    })

                    test(`edge case - no value`, () => {
                        expect(isEnvVar('TEST=')).toBeFalsy()
                    })

                    test(`edge case - numeric key`, () => {
                        expect(isEnvVar('123')).toBeFalsy()
                    })

                    test(`edge case - numeric partial`, () => {
                        expect(isEnvVar('123=')).toBeFalsy()
                    })

                    test(`edge case - null value`, () => {
                        expect(isEnvVar(null)).toBeFalsy()
                    })

                    test(`edge case - empty object`, () => {
                        expect(isEnvVar({})).toBeFalsy()
                    })

                    test(`edge case - empty string`, () => {
                        expect(isEnvVar('')).toBeFalsy()
                    })

                    test(`edge case - empty array`, () => {
                        expect(isEnvVar([])).toBeFalsy()
                    })

                    test(`edge case - array with empty string`, () => {
                        expect(isEnvVar([''])).toBeFalsy()
                    })
                })
            })
        })
    })
})
