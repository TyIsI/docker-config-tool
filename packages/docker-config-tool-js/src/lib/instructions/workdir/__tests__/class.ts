import { generateConstructorErrorMessage } from '../../../shared/utils'
import { WorkdirInstruction } from '../class'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`WORKDIR`, () => {
                describe(`class`, () => {
                    describe(`constructor`, () => {
                        test(`does thing`, () => {
                            const workdirInstruction = new WorkdirInstruction('/workdir')

                            expect(workdirInstruction.toString()).toMatch('WORKDIR /workdir')
                        })

                        test(`does not do thing`, () => {
                            const testVal = undefined

                            expect(() => {
                                // @ts-expect-error undefined
                                const workdirInstruction = new WorkdirInstruction(testVal)

                                workdirInstruction.toString()
                            }).toThrow(generateConstructorErrorMessage('WORKDIR', testVal))
                        })
                    })
                })
            })
        })
    })
})
