import { Stage } from '../../../class'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`stage`, () => {
            describe(`class`, () => {
                describe(`methods`, () => {
                    describe(`createCMD`, () => {
                        test(`create a stage from string and append a valid instruction`, () => {
                            const stage = new Stage('scratch')

                            stage.createCMD('TEST')

                            expect(stage.toString()).toBeTruthy()
                        })

                        test(`don't create a stage from string and append a invalid instruction`, () => {
                            const testVal = undefined

                            expect(() => {
                                const stage = new Stage('scratch')

                                // @ts-expect-error invalid
                                stage.createCMD(testVal)

                                stage.toString()
                            }).toThrow()
                        })
                    })
                })
            })
        })
    })
})
