import { DockerConfigTool } from '../../../class'

describe(`DCT`, () => {
    describe(`class`, () => {
        describe(`methods`, () => {
            describe(`toString`, () => {
                test(`print it with a simple stage`, () => {
                    const dct = new DockerConfigTool()

                    const stage = dct.withStage('scratch')

                    expect(dct.toString().trim()).toBe(`FROM scratch AS ${stage.id}`)
                })

                test(`print it with ARG`, () => {
                    const dct = new DockerConfigTool()

                    dct.withArg('TESTARG')

                    const stage = dct.withStage('scratch')

                    expect(dct.toString().trim()).toMatch(`ARG TESTARG\nFROM scratch AS ${stage.id}`)
                })

                test(`don't print it if the stack is empty`, () => {
                    expect(() => {
                        const dct = new DockerConfigTool()

                        dct.toString()
                    }).toThrow('Empty stack. Nothing to print.')
                })
            })
        })
    })
})
