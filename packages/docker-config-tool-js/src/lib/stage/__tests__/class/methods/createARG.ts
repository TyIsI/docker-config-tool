import { Stage } from '../../../class'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`stage`, () => {
            describe(`class`, () => {
                describe(`methods`, () => {
                    describe(`createARG`, () => {
                        test(`create a stage from string and append a valid instruction`, () => {
                            const stage = new Stage('scratch')

                            stage.createARG('TEST')

                            expect(stage.toString()).toBeTruthy()
                        })

                        test(`create a stage from string and append a valid instruction`, () => {
                            const stage = new Stage('scratch')

                            stage.createARG('TEST=test')

                            expect(stage.toString()).toBeTruthy()
                        })

                        test(`create a stage from string and append a valid instruction`, () => {
                            const stage = new Stage('scratch')

                            stage.createARG({ name: 'TEST', value: 'test' })

                            expect(stage.toString()).toBeTruthy()
                        })

                        test(`don't create a stage from string and append a invalid instruction`, () => {
                            const testVal = undefined

                            expect(() => {
                                const stage = new Stage('scratch')

                                // @ts-expect-error invalid
                                stage.createARG(testVal)

                                stage.toString()
                            }).toThrow()
                        })

                        test(`don't create a stage from string and append a invalid instruction`, () => {
                            const testVal = 'TEST='

                            expect(() => {
                                const stage = new Stage('scratch')

                                stage.createARG(testVal)

                                stage.toString()
                            }).toThrow()
                        })
                    })
                })
            })
        })
    })
})
