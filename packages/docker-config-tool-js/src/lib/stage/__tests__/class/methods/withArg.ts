import { Stage } from '../../../class'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`stage`, () => {
            describe(`class`, () => {
                describe(`methods`, () => {
                    describe(`withArg`, () => {
                        test(`create a stage from string and append a valid instruction`, () => {
                            const stage = new Stage('scratch')

                            stage.withArg('TEST')

                            expect(stage.toString()).toBeTruthy()
                        })

                        test(`create a stage from string and append a valid instruction`, () => {
                            const stage = new Stage('scratch')

                            stage.withArg('TEST=test')

                            expect(stage.toString()).toBeTruthy()
                        })

                        test(`create a stage from string and append a valid instruction`, () => {
                            const stage = new Stage('scratch')

                            stage.withArg({ name: 'TEST', value: 'test' })

                            expect(stage.toString()).toBeTruthy()
                        })

                        test(`don't create a stage from string and append a invalid instruction`, () => {
                            const testVal = undefined

                            expect(() => {
                                const stage = new Stage('scratch')

                                // @ts-expect-error invalid
                                stage.withArg(testVal)

                                stage.toString()
                            }).toThrow()
                        })

                        test(`don't create a stage from string and append a invalid instruction`, () => {
                            const testVal = 'TEST='

                            expect(() => {
                                const stage = new Stage('scratch')

                                stage.withArg(testVal)

                                stage.toString()
                            }).toThrow()
                        })
                    })
                })
            })
        })
    })
})
