import { Stage } from '../../../class'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`stage`, () => {
            describe(`class`, () => {
                describe(`constructor`, () => {
                    describe(`common`, () => {
                        test(`create a stage from string`, () => {
                            const stage = new Stage('scratch')

                            expect(stage.toString()).toMatch('FROM scratch')
                        })

                        test(`create a stage from object`, () => {
                            const stage = new Stage({ from: 'scratch' })

                            expect(stage.toString()).toMatch('FROM scratch')
                        })

                        test(`create a stage from object with a name`, () => {
                            const stage = new Stage({ from: 'scratch', as: 'workspace' })

                            expect(stage.toString()).toMatch('FROM scratch AS workspace')
                        })

                        test(`create a stage from object with a name and platform`, () => {
                            const stage = new Stage({ from: 'scratch', platform: 'x64', as: 'workspace' })

                            expect(stage.toString()).toMatch('FROM --platform=x64 scratch AS workspace')
                        })

                        test(`create a stage from another stage`, () => {
                            const stage1 = new Stage({ from: 'scratch' })

                            const stage2 = new Stage(stage1)

                            expect(stage2.toString()).toMatch(`FROM ${stage1.id} AS ${stage2.id}`)
                        })

                        test(`create a stage from another stage as an object`, () => {
                            const stage1 = new Stage({ from: 'scratch' })

                            const stage2 = new Stage({ from: stage1 })

                            expect(stage2.toString()).toMatch(`FROM ${stage1.id} AS ${stage2.id}`)
                        })

                        test(`create a stage from another stage as an object with a name`, () => {
                            const stage1 = new Stage({ from: 'scratch' })

                            const stage2 = new Stage({ from: stage1, as: 'stage2' })

                            expect(stage2.toString()).toMatch(`FROM ${stage1.id} AS stage2`)
                        })

                        test(`create a stage and set id`, () => {
                            const stage = new Stage('scratch')

                            expect(stage.toString()).toMatch('FROM scratch')

                            stage.setId('stage')

                            expect(stage.toString()).toMatch('FROM scratch AS stage')
                        })

                        test(`don't create with empty argument`, () => {
                            const testVal = undefined

                            expect(() => {
                                // @ts-expect-error undefined
                                const stage = new Stage(testVal)

                                stage.toString()
                            }).toThrow()
                        })

                        test(`don't create with empty string argument`, () => {
                            const testVal = ''

                            expect(() => {
                                const stage = new Stage(testVal)

                                stage.toString()
                            }).toThrow()
                        })

                        test(`don't create with empty from in object argument`, () => {
                            const testVal = { from: undefined }

                            expect(() => {
                                // @ts-expect-error object
                                const stage = new Stage(testVal)

                                stage.toString()
                            }).toThrow()
                        })

                        test(`don't create with empty from string in object argument`, () => {
                            const testVal = { from: '' }

                            expect(() => {
                                const stage = new Stage(testVal)

                                stage.toString()
                            }).toThrow()
                        })

                        test(`don't create a stage and set id with undefined value`, () => {
                            const stage = new Stage('scratch')

                            expect(() => {
                                // @ts-expect-error undefined
                                stage.setId(undefined)
                            }).toThrow()
                        })

                        test('automatically generated id', () => {
                            const stage = new Stage('scratch')

                            expect(stage.id).toMatch('stage-d505e1ae')
                        })
                    })
                })
            })
        })
    })
})
