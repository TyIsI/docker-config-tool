import { isLabelVar } from '../../guards'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`shared`, () => {
            describe(`guards`, () => {
                describe(`isLabelVar`, () => {
                    test(`pass - default`, () => {
                        expect(isLabelVar('TEST=test')).toBeTruthy()
                    })

                    test(`edge case - key only`, () => {
                        expect(isLabelVar('TEST')).toBeFalsy()
                    })

                    test(`edge case - no value`, () => {
                        expect(isLabelVar('TEST=')).toBeFalsy()
                    })

                    test(`edge case - numeric key`, () => {
                        expect(isLabelVar('123')).toBeFalsy()
                    })

                    test(`edge case - numeric partial`, () => {
                        expect(isLabelVar('123=')).toBeFalsy()
                    })

                    test(`edge case - null value`, () => {
                        expect(isLabelVar(null)).toBeFalsy()
                    })

                    test(`edge case - empty object`, () => {
                        expect(isLabelVar({})).toBeFalsy()
                    })

                    test(`edge case - empty string`, () => {
                        expect(isLabelVar('')).toBeFalsy()
                    })

                    test(`edge case - empty array`, () => {
                        expect(isLabelVar([])).toBeFalsy()
                    })

                    test(`edge case - array with empty string`, () => {
                        expect(isLabelVar([''])).toBeFalsy()
                    })
                })
            })
        })
    })
})
