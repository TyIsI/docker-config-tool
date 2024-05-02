import { isObjectWithProperty } from '../../guards'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`shared`, () => {
            describe(`guards`, () => {
                describe(`isObjectWithProperty`, () => {
                    test(`pass - default`, () => {
                        expect(isObjectWithProperty({ test: 'test' }, 'test')).toBeTruthy()
                    })

                    test(`edge case - missing key`, () => {
                        expect(isObjectWithProperty({ test: 'test' }, 'missing')).toBeFalsy()
                    })

                    test(`edge case - empty object`, () => {
                        expect(isObjectWithProperty({}, 'invalid')).toBeFalsy()
                    })

                    test(`edge case - array`, () => {
                        expect(isObjectWithProperty([], 'invalid')).toBeFalsy()
                    })

                    test(`edge case - string`, () => {
                        expect(isObjectWithProperty('string', 'invalid')).toBeFalsy()
                    })

                    test(`edge case - null`, () => {
                        expect(isObjectWithProperty(null, 'invalid')).toBeFalsy()
                    })
                })
            })
        })
    })
})
