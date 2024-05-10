import { Stage } from '../class'
import { coerceStageFromInstructionObjectParam } from '../coerce'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`stage`, () => {
            describe(`coerce`, () => {
                describe(`coerceStageFromInstructionObjectParam`, () => {
                    test(`pass - coerceStageFromInstructionObjectParam`, () => {
                        const stage = new Stage({ from: 'scratch', as: 'stage' })

                        expect(coerceStageFromInstructionObjectParam({ from: stage })).toMatchObject({
                            from: 'stage'
                        })
                    })

                    test(`fail - coerceStageFromInstructionObjectParam`, () => {
                        // @ts-expect-error null error
                        expect(() => coerceStageFromInstructionObjectParam({ from: null })).toThrow(
                            'Could not coerce invalid stageParam'
                        )
                    })
                })
            })
        })
    })
})
