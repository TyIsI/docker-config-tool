import { Stage } from '../../../class'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`stage`, () => {
            describe(`class`, () => {
                describe(`methods`, () => {
                    describe(`forceRandomId`, () => {
                        test(`forceRandomId`, () => {
                            const stage = new Stage('scratch')

                            // @ts-expect-error private
                            expect(stage.forceRandomId()).toMatch(/stage-\w+/)
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
