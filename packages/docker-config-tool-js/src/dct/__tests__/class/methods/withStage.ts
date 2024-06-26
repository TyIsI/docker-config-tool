import { DockerConfigTool } from '../../../class'

describe(`DCT`, () => {
    describe(`class`, () => {
        describe(`methods`, () => {
            describe(`withStage`, () => {
                test(`create a stage`, () => {
                    const dct = new DockerConfigTool()

                    const stage = dct.withStage('scratch')

                    stage.toString()

                    expect(dct.toString()).toMatch('FROM scratch')
                })
            })
        })
    })
})
