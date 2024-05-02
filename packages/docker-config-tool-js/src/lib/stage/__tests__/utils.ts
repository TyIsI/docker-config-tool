import { Stage } from '../class'
import { coerceStageFromStage } from '../utils'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`stage`, () => {
            describe(`utils`, () => {
                describe(`coerceStageFromStage`, () => {
                    test(`pass - coerceStageFromStage`, () => {
                        const stage = new Stage({ from: 'scratch', as: 'stage' })

                        expect(coerceStageFromStage({ from: stage })).toMatchObject({
                            from: 'stage'
                        })
                    })

                    test(`fail - coerceStageFromStage`, () => {
                        expect(() => coerceStageFromStage({ from: null })).toThrow(
                            'Stage from stage is not a from stage from a stage'
                        )
                    })
                })
            })
        })
    })
})
