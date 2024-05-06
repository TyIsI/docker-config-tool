import { Stage } from '../../../class'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`stage`, () => {
            describe(`class`, () => {
                describe(`methods`, () => {
                    describe(`withVolume`, () => {
                        test(`create a stage from string and append a valid volume instruction`, () => {
                            const stage = new Stage('scratch')

                            stage.withVolume('/data')

                            expect(stage.toString()).toBeTruthy()
                        })

                        test(`don't create a stage from string and append an invalid volume instruction`, () => {
                            const testVal = undefined

                            expect(() => {
                                const stage = new Stage('scratch')

                                // @ts-expect-error invalid
                                stage.withVolume(testVal)

                                stage.toString()
                            }).toThrow()
                        })
                    })
                })
            })
        })
    })
})
