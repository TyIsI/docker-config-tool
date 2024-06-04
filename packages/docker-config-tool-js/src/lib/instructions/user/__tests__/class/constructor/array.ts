import { UserInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`USER`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        describe(`array argument`, () => {
                            test(`create with array with numeric uid`, () => {
                                const userInstruction = new UserInstruction([123])

                                expect(userInstruction.toString()).toMatch('USER 123')
                            })

                            test(`create with array with string uid`, () => {
                                const userInstruction = new UserInstruction(['123'])

                                expect(userInstruction.toString()).toMatch('USER 123')
                            })

                            test(`create with object with numeric uid and gid `, () => {
                                const userInstruction = new UserInstruction([123, 123])

                                expect(userInstruction.toString()).toMatch('USER 123:123')
                            })

                            test(`create with object with string uid and gid `, () => {
                                const userInstruction = new UserInstruction(['123', '123'])

                                expect(userInstruction.toString()).toMatch('USER 123:123')
                            })
                        })
                    })
                })
            })
        })
    })
})
