import { generateConstructorErrorMessage } from '../../../shared/utils'
import { WorkDirInstruction } from '../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`WORKDIR`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        test(`does thing`, () => {
                            const workdirInstruction = new WorkDirInstruction('/workdir')

                            expect(workdirInstruction.toString()).toMatch('WORKDIR /workdir')
                        })

                        test(`does not do thing`, () => {
                            const testVal = undefined

                            expect(() => {
                                // @ts-expect-error undefined
                                const workdirInstruction = new WorkDirInstruction(testVal)

                                workdirInstruction.toString()
                            }).toThrow(generateConstructorErrorMessage('WORKDIR', testVal))
                        })
                    })
                })
            })
        })
    })
})
