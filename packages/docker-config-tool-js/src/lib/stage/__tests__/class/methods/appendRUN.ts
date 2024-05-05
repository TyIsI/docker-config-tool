import { Stage } from '../../../class'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`stage`, () => {
            describe(`class`, () => {
                describe(`methods`, () => {
                    describe(`appendRUN`, () => {
                        test(`create a stage from string and append a valid run instruction`, () => {
                            const stage = new Stage('scratch')

                            stage.appendRun('/bin/sh')

                            expect(stage.toString()).toBeTruthy()
                        })

                        test(`create a stage from string and append a valid run instruction`, () => {
                            const stage = new Stage('scratch')

                            stage.appendRun('/bin/sh -c')

                            expect(stage.toString()).toBeTruthy()
                        })

                        test(`create a stage from string and append a run instruction with an array`, () => {
                            const stage = new Stage('scratch')

                            stage.appendRun(['/bin/sh'])

                            expect(stage.toString()).toBeTruthy()
                        })

                        test(`create a stage from string and append a run instruction with an array`, () => {
                            const stage = new Stage('scratch')

                            stage.appendRun(['/bin/sh -c'])

                            expect(stage.toString()).toBeTruthy()
                        })

                        test(`create a stage from string and append a run instruction with an array`, () => {
                            const stage = new Stage('scratch')

                            stage.appendRun(['/bin/sh', '-c'])

                            expect(stage.toString()).toBeTruthy()
                        })

                        test(`create a stage from string and append a run instruction with an object`, () => {
                            const stage = new Stage('scratch')

                            stage.appendRun({
                                commands: '/bin/sh -c'
                            })

                            expect(stage.toString()).toBeTruthy()
                        })

                        test(`don't create a stage from string and append am invalid run instruction`, () => {
                            const testVal = undefined

                            expect(() => {
                                const stage = new Stage('scratch')

                                // @ts-expect-error invalid
                                stage.appendRun(testVal)

                                stage.toString()
                            }).toThrow()
                        })
                    })
                })
            })
        })
    })
})
