import { DockerConfigTool } from '../../../class'

describe(`DCT`, () => {
    describe(`class`, () => {
        describe(`methods`, () => {
            describe(`withDirective`, () => {
                test(`create and add a syntax directive`, () => {
                    const dct = new DockerConfigTool()

                    dct.withDirective('syntax', 'docker/dockerfile:1')

                    const stage = dct.withStage('scratch')

                    expect(dct.toString()).toMatch(`# syntax=docker/dockerfile:1\n\nFROM scratch AS ${stage.id}`)
                })
            })
        })
    })
})
