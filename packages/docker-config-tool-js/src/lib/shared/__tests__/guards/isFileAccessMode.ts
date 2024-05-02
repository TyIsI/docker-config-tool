import { isFileAccessMode } from '../../guards'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`shared`, () => {
            describe(`guards`, () => {
                describe(`isFileAccessMode`, () => {
                    test(`pass - numeric`, () => {
                        expect(isFileAccessMode(7777)).toBeTruthy()
                    })

                    test(`pass - string`, () => {
                        expect(isFileAccessMode('7777')).toBeTruthy()
                    })

                    test(`edge case - array with single numeric value`, () => {
                        expect(isFileAccessMode([1777])).toBeFalsy()
                    })

                    test(`edge case - array with single string value`, () => {
                        expect(isFileAccessMode(['1777'])).toBeFalsy()
                    })

                    test(`edge case - numeric negative out of bounds`, () => {
                        expect(isFileAccessMode(-7777)).toBeFalsy()
                    })

                    test(`edge case - string negative out of bounds`, () => {
                        expect(isFileAccessMode('-7777')).toBeFalsy()
                    })

                    test(`edge case - numeric positive out of bounds`, () => {
                        expect(isFileAccessMode(8888)).toBeFalsy()
                    })

                    test(`edge case - string positive out of bounds`, () => {
                        expect(isFileAccessMode('8888')).toBeFalsy()
                    })

                    test(`edge case - numeric out of spec`, () => {
                        expect(isFileAccessMode(88888)).toBeFalsy()
                    })

                    test(`edge case - string out of spec`, () => {
                        expect(isFileAccessMode('88888')).toBeFalsy()
                    })

                    test(`edge case - invalid value`, () => {
                        expect(isFileAccessMode('invalid')).toBeFalsy()
                    })

                    test(`edge case - null value`, () => {
                        expect(isFileAccessMode(null)).toBeFalsy()
                    })

                    test(`edge case - empty object`, () => {
                        expect(isFileAccessMode({})).toBeFalsy()
                    })
                })
            })
        })
    })
})
