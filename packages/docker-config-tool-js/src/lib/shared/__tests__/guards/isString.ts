import { isString } from '../../guards'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`shared`, () => {
            describe(`guards`, () => {
                describe(`isString`, () => {
                    test(`pass - default`, () => {
                        expect(isString('test')).toBeTruthy()
                    })

                    test(`edge case - empty string`, () => {
                        expect(isString('')).toBeFalsy()
                    })

                    test(`edge case - false`, () => {
                        expect(isString(false)).toBeFalsy()
                    })

                    test(`edge case - string array`, () => {
                        expect(isString([''])).toBeFalsy()
                    })
                })
            })
        })
    })
})
