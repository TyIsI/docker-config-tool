import { Stage } from '../class'
import { isStageConstructorParams } from '../guards'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`stage`, () => {
            describe(`guards`, () => {
                describe(`isStageConstructorParams`, () => {
                    test(`pass - default`, () => {
                        expect(isStageConstructorParams('scratch')).toBeTruthy()
                    })

                    test(`pass - object`, () => {
                        expect(isStageConstructorParams({ from: 'scratch' })).toBeTruthy()
                    })

                    test(`pass - object with other params`, () => {
                        expect(isStageConstructorParams({ from: 'scratch', platform: 'x64', as: 'x64' })).toBeTruthy()
                    })

                    test(`pass - object with stage from`, () => {
                        const stage = new Stage({ from: 'scratch', as: 'stage' })

                        expect(isStageConstructorParams({ from: stage })).toBeTruthy()
                    })

                    test(`pass - object with stage from and other params`, () => {
                        const stage = new Stage({ from: 'scratch', as: 'stage' })

                        expect(isStageConstructorParams({ from: stage, platform: 'x64', as: 'x64' })).toBeTruthy()
                    })

                    test(`fail - undefined value`, () => {
                        expect(isStageConstructorParams(undefined)).toBeFalsy()
                    })

                    test(`fail - empty object`, () => {
                        expect(isStageConstructorParams({})).toBeFalsy()
                    })

                    test(`fail - object with empty from`, () => {
                        expect(isStageConstructorParams({ from: '' })).toBeFalsy()
                    })
                })
            })
        })
    })
})
