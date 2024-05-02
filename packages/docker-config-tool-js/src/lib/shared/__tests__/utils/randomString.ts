import { randomString } from '../../utils'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`shared`, () => {
            describe(`utils`, () => {
                describe(`randomString`, () => {
                    test(`randomString without arguments`, () => {
                        expect(randomString()).toBeTruthy()
                    })

                    test(`randomString with argument (1)`, () => {
                        expect(randomString(1)).toBeTruthy()
                    })

                    test(`randomString with argument (2)`, () => {
                        expect(randomString(2)).toBeTruthy()
                    })
                })
            })
        })
    })
})
