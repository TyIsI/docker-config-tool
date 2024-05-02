import { DockerConfigTool } from '../../../class'

describe(`DCT`, () => {
    describe(`class`, () => {
        describe(`methods`, () => {
            describe(`createStage`, () => {
                test(`create a stage`, () => {
                    const dct = new DockerConfigTool()

                    const stage = dct.createStage('scratch')

                    expect(stage).toBeTruthy()
                })
            })
        })
    })
})
