import { isPartialLabelVar } from '../../guards'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`shared`, () => {
            describe(`guards`, () => {
                describe(`isPartialLabelVar`, () => {
                    test(`pass - default`, () => {
                        expect(isPartialLabelVar('TEST=test')).toBeTruthy()
                    })

                    test(`pass - key only`, () => {
                        expect(isPartialLabelVar('TEST')).toBeTruthy()
                    })

                    test(`pass - value with space`, () => {
                        expect(isPartialLabelVar('TEST=test value')).toBeTruthy()
                    })

                    test(`edge case - no value`, () => {
                        expect(isPartialLabelVar('TEST=')).toBeFalsy()
                    })

                    test(`edge case - numeric key`, () => {
                        expect(isPartialLabelVar('123')).toBeFalsy()
                    })

                    test(`edge case - numeric partial`, () => {
                        expect(isPartialLabelVar('123=')).toBeFalsy()
                    })

                    test(`edge case - null value`, () => {
                        expect(isPartialLabelVar(null)).toBeFalsy()
                    })

                    test(`edge case - empty object`, () => {
                        expect(isPartialLabelVar({})).toBeFalsy()
                    })

                    test(`edge case - empty string`, () => {
                        expect(isPartialLabelVar('')).toBeFalsy()
                    })

                    test(`edge case - empty array`, () => {
                        expect(isPartialLabelVar([])).toBeFalsy()
                    })

                    test(`edge case - array with empty string`, () => {
                        expect(isPartialLabelVar([''])).toBeFalsy()
                    })
                })
            })
        })
    })
})
