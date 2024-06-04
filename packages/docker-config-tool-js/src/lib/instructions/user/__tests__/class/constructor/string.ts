import { UserInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`USER`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        describe(`string argument`, () => {
                            test(`create with string uid`, () => {
                                const userInstruction = new UserInstruction('123')

                                expect(userInstruction.toString()).toMatch('USER 123')
                            })

                            test(`create with uid and gid strings`, () => {
                                const userInstruction = new UserInstruction('123', '123')

                                expect(userInstruction.toString()).toMatch('USER 123:123')
                            })

                            test(`create with string with uid and gid `, () => {
                                const userInstruction = new UserInstruction('123:123')

                                expect(userInstruction.toString()).toMatch('USER 123:123')
                            })
                        })
                    })
                })
            })
        })
    })
})
