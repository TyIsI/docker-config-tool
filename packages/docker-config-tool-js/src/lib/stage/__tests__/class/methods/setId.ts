import { Stage } from '../../../class'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`stage`, () => {
            describe(`class`, () => {
                describe(`methods`, () => {
                    describe(`setId`, () => {
                        test(`create a stage from string and set id`, () => {
                            const stage = new Stage('scratch')

                            stage.setId('base')

                            expect(stage.toString()).toMatch('FROM scratch AS base')
                        })

                        test(`throw an error if trying to set invalid id`, () => {
                            const testVal = undefined

                            expect(() => {
                                const stage = new Stage('scratch')

                                // @ts-expect-error invalid
                                stage.setId(testVal)
                            }).toThrow()
                        })
                    })
                })
            })
        })
    })
})
