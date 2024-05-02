import { coerceFileAccessMode } from '../../coerce'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`shared`, () => {
            describe(`coerce`, () => {
                describe(`coerceFileAccessMode`, () => {
                    test(`pass - default`, () => {
                        const testVal = 1777

                        expect(coerceFileAccessMode(testVal)).toBe(String(testVal))
                    })

                    test(`fail - invalid access mode`, () => {
                        const testVal = 8888

                        expect(() => coerceFileAccessMode(testVal)).toThrow('Invalid file access mode')
                    })
                })
            })
        })
    })
})
