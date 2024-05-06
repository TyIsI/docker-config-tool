import { Stage } from '../../../class'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`stage`, () => {
            describe(`class`, () => {
                describe(`methods`, () => {
                    describe(`withStopSignal`, () => {
                        test(`create a stage from string and append a valid instruction`, () => {
                            const stage = new Stage('scratch')

                            stage.withStopSignal('SIGHUP')

                            expect(stage.toString()).toBeTruthy()
                        })

                        test(`don't create a stage from string and append a invalid instruction`, () => {
                            const testVal = undefined

                            expect(() => {
                                const stage = new Stage('scratch')

                                // @ts-expect-error invalid
                                stage.withStopSignal(testVal)

                                stage.toString()
                            }).toThrow()
                        })
                    })
                })
            })
        })
    })
})
