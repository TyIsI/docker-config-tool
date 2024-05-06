import { Stage } from '../../../class'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`stage`, () => {
            describe(`class`, () => {
                describe(`methods`, () => {
                    describe(`withWorkDir`, () => {
                        test(`create a stage from string and append a valid workdir instruction`, () => {
                            const stage = new Stage('scratch')

                            stage.withWorkDir('/data')

                            expect(stage.toString()).toBeTruthy()
                        })

                        test(`don't create a stage from string and append an invalid workdir instruction`, () => {
                            const testVal = undefined

                            expect(() => {
                                const stage = new Stage('scratch')

                                // @ts-expect-error invalid
                                stage.withWorkDir(testVal)

                                stage.toString()
                            }).toThrow()
                        })
                    })
                })
            })
        })
    })
})
