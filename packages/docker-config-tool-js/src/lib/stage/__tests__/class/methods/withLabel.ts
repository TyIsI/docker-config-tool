import { Stage } from '../../../class'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`stage`, () => {
            describe(`class`, () => {
                describe(`methods`, () => {
                    describe(`withLabel`, () => {
                        test(`create a stage from string and append a simple string label`, () => {
                            const testVal = 'TEST'

                            const stage = new Stage('scratch')

                            stage.withLabel(testVal)

                            expect(stage.toString()).toBeTruthy()
                        })

                        test(`create a stage from string and append a simple string label as an array`, () => {
                            const testVal = ['com.example.label=test']

                            const stage = new Stage('scratch')

                            stage.withLabel(testVal)

                            expect(stage.toString()).toBeTruthy()
                        })

                        test(`create a stage from string and append a simple string label as an object`, () => {
                            const testVal = { 'com.example.label': 'test' }

                            const stage = new Stage('scratch')

                            stage.withLabel(testVal)

                            expect(stage.toString()).toBeTruthy()
                        })

                        test(`create a stage from string and append a simple string label as an object and add another label`, () => {
                            const testVal = { 'com.example.label': 'test' }

                            const stage = new Stage('scratch')

                            stage.withLabel(testVal).addLabel('com.example.debug=true')

                            expect(stage.toString()).toBeTruthy()
                        })

                        test(`don't create a stage from string and append a invalid instruction`, () => {
                            const testVal = undefined

                            expect(() => {
                                const stage = new Stage('scratch')

                                // @ts-expect-error invalid
                                stage.withLabel(testVal)

                                stage.toString()
                            }).toThrow()
                        })
                    })
                })
            })
        })
    })
})
