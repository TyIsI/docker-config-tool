import { generateInvalidArgumentErrorMessage } from '../../../../../shared/utils'
import { UserInstruction } from '../../../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`USER`, () => {
                describe(`class`, () => {
                    describe(`methods`, () => {
                        describe(`setOnBuild`, () => {
                            test(`set`, () => {
                                const userInstruction = new UserInstruction('123:123')

                                userInstruction.setOnBuild()

                                expect(userInstruction.toString()).toMatch('ONBUILD USER 123:123')
                            })

                            test(`set with value`, () => {
                                const userInstruction = new UserInstruction('123:123')

                                userInstruction.setOnBuild(true)

                                expect(userInstruction.toString()).toMatch('ONBUILD USER 123:123')
                            })

                            test(`set and unset`, () => {
                                const userInstruction = new UserInstruction('123:123')

                                userInstruction.setOnBuild(true)

                                userInstruction.setOnBuild(false)

                                expect(userInstruction.toString()).toMatch('USER 123:123')
                            })

                            test(`do not set with invalid value`, () => {
                                const val = 'no'

                                expect(() => {
                                    const userInstruction = new UserInstruction('123:123')

                                    // @ts-expect-error not assignable
                                    userInstruction.setOnBuild(val)
                                }).toThrow(generateInvalidArgumentErrorMessage('USER', val))
                            })
                        })
                    })
                })
            })
        })
    })
})
