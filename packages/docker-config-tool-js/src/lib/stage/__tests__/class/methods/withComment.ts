import { Stage } from '../../../class'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`stage`, () => {
            describe(`class`, () => {
                describe(`methods`, () => {
                    describe(`withComment`, () => {
                        test(`create a stage from string and add a comment`, () => {
                            const stage = new Stage('scratch')

                            stage.withComment('TEST')

                            expect(stage.toString()).toBeTruthy()
                        })

                        test(`create a stage from string and add an empty comment`, () => {
                            const stage = new Stage('scratch')

                            stage.withComment('')

                            expect(stage.toString()).toBeTruthy()
                        })

                        test(`don't append an invalid comment`, () => {
                            const testVal = undefined

                            expect(() => {
                                const stage = new Stage('scratch')

                                // @ts-expect-error invalid
                                stage.withComment(testVal)

                                stage.toString()
                            }).toThrow()
                        })
                    })
                })
            })
        })
    })
})
