import { Stage } from '../class'
import { isStageConstructorArgs } from '../guards'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`stage`, () => {
            describe(`guards`, () => {
                describe(`isStageConstructorArgs`, () => {
                    test(`pass - default`, () => {
                        expect(isStageConstructorArgs('scratch')).toBeTruthy()
                    })

                    test(`pass - object`, () => {
                        expect(isStageConstructorArgs({ from: 'scratch' })).toBeTruthy()
                    })

                    test(`pass - object with other params`, () => {
                        expect(isStageConstructorArgs({ from: 'scratch', platform: 'x64', as: 'x64' })).toBeTruthy()
                    })

                    test(`pass - object with stage from`, () => {
                        const stage = new Stage({ from: 'scratch', as: 'stage' })

                        expect(isStageConstructorArgs({ from: stage })).toBeTruthy()
                    })

                    test(`pass - object with stage from and other params`, () => {
                        const stage = new Stage({ from: 'scratch', as: 'stage' })

                        expect(isStageConstructorArgs({ from: stage, platform: 'x64', as: 'x64' })).toBeTruthy()
                    })

                    test(`fail - undefined value`, () => {
                        expect(isStageConstructorArgs(undefined)).toBeFalsy()
                    })

                    test(`fail - empty object`, () => {
                        expect(isStageConstructorArgs({})).toBeFalsy()
                    })

                    test(`fail - object with empty from`, () => {
                        expect(isStageConstructorArgs({ from: '' })).toBeFalsy()
                    })
                })
            })
        })
    })
})
