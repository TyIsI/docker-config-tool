import { UserInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`USER`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        describe(`object argument`, () => {
                            test(`create with object with uid and gid `, () => {
                                const userInstruction = new UserInstruction({ uid: '123' })

                                expect(userInstruction.toString()).toMatch('USER 123')
                            })

                            test(`create with object with uid and gid `, () => {
                                const userInstruction = new UserInstruction({ uid: '123', gid: '123' })

                                expect(userInstruction.toString()).toMatch('USER 123:123')
                            })
                        })
                    })
                })
            })
        })
    })
})
