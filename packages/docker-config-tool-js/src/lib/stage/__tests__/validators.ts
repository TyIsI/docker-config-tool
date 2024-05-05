import { Stage } from '../class'
import { validStageConstructorParams } from '../validators'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`stage`, () => {
            describe(`validators`, () => {
                describe(`validStageConstructorParams`, () => {
                    test(`pass - default`, () => {
                        const testVal = 'scratch'

                        const [valid, result] = validStageConstructorParams(testVal)

                        expect(valid).toBeTruthy()
                        expect(result).toMatch(testVal)
                    })

                    test(`pass - object`, () => {
                        const testVal = { from: 'scratch' }

                        const [valid, result] = validStageConstructorParams(testVal)

                        expect(valid).toBeTruthy()
                        expect(result).toMatchObject(testVal)
                    })

                    test(`pass - object with other params`, () => {
                        const testVal = { from: 'scratch', platform: 'x64', as: 'x64' }

                        const [valid, result] = validStageConstructorParams(testVal)

                        expect(valid).toBeTruthy()
                        expect(result).toMatchObject(testVal)
                    })

                    test(`pass - object with stage from`, () => {
                        const stage = new Stage({ from: 'scratch', as: 'stage' })

                        const [valid, result] = validStageConstructorParams({ from: stage })

                        expect(valid).toBeTruthy()
                        expect(result).toBeTruthy()
                    })

                    test(`pass - object with stage from and other params`, () => {
                        const stage = new Stage({ from: 'scratch', as: 'stage' })

                        const [valid, result] = validStageConstructorParams({ from: stage, platform: 'x64', as: 'x64' })

                        expect(valid).toBeTruthy()
                        expect(result).toBeTruthy()
                    })

                    test(`fail - undefined value`, () => {
                        // @ts-expect-error undefined
                        const [valid, result] = validStageConstructorParams(undefined)

                        expect(valid).toBeFalsy()
                        expect(result).toBeTruthy()
                    })

                    test(`fail - empty object`, () => {
                        // @ts-expect-error undefined
                        const [valid, result] = validStageConstructorParams({})

                        expect(valid).toBeFalsy()
                        expect(result).toBeTruthy()
                    })

                    test(`fail - object with empty from`, () => {
                        const testVal = { from: '' }

                        const [valid, result] = validStageConstructorParams(testVal)

                        expect(valid).toBeFalsy()
                        expect(result).toBeTruthy()
                    })
                })
            })
        })
    })
})
