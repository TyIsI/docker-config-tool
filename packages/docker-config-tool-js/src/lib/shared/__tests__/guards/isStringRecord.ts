import { isStringRecord } from '../../guards'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`shared`, () => {
            describe(`guards`, () => {
                describe(`isStringRecord`, () => {
                    test(`pass - default`, () => {
                        expect(isStringRecord({ test: 'test' })).toBeTruthy()
                    })

                    test(`edge case - coerceable false value`, () => {
                        expect(isStringRecord({ test: false })).toBeTruthy()
                    })

                    test(`edge case - coerceable string array value`, () => {
                        expect(isStringRecord({ test: [''] })).toBeTruthy()
                    })

                    test(`edge case - empty object`, () => {
                        expect(isStringRecord({})).toBeFalsy()
                    })
                })
            })
        })
    })
})
