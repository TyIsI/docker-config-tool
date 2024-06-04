import {
    isRunInstructionBooleanFields,
    isRunInstructionCacheSharingTypes,
    isRunInstructionMountParam,
    isRunInstructionMountTypeBind,
    isRunInstructionMountTypeBindCommon,
    isRunInstructionMountTypeBindRW,
    isRunInstructionMountTypeBindReadWrite,
    isRunInstructionMountTypeCache,
    isRunInstructionMountTypeCacheCommon,
    isRunInstructionMountTypeCacheRO,
    isRunInstructionMountTypeCacheReadOnly,
    isRunInstructionMountTypeSSH,
    isRunInstructionMountTypeSecret,
    isRunInstructionMountTypeTmpFS,
    isRunInstructionNetworkParam,
    isRunInstructionParams,
    isRunInstructionParamsObject,
    isRunInstructionSecurityParam,
    isRunInstructions
} from '../guards'

import {
    RunInstructionBooleanFieldsTestData,
    RunInstructionCacheSharingTypesTestData,
    RunInstructionMountRunParamsTestData,
    RunInstructionMountTypeBindCommonTestData,
    RunInstructionMountTypeCacheCommonTestData,
    RunInstructionMountTypeSSHTestData,
    RunInstructionMountTypeSecretTestData,
    RunInstructionMountTypeTmpFSTestData,
    RunInstructionNetworkRunParamTestData,
    RunInstructionParamsObjectTestData,
    RunInstructionParamsTestData,
    RunInstructionSecurityRunParamTestData,
    RunInstructionsTestData
} from './__fixtures__/guards'

describe('DCT', () => {
    describe('lib', () => {
        describe('instructions', () => {
            describe(`RUN`, () => {
                describe(`guards`, () => {
                    test(`isRunInstructionParamsObject`, () => {
                        RunInstructionParamsObjectTestData.forEach((testVal) => {
                            expect(isRunInstructionParamsObject(testVal)).toBe(true)
                        })
                    })

                    test(`isRunInstructionBooleanFields`, () => {
                        RunInstructionBooleanFieldsTestData.forEach((testVal) => {
                            expect(isRunInstructionBooleanFields(testVal)).toBe(true)
                        })
                    })

                    test(`isRunInstructionCacheSharingTypes`, () => {
                        RunInstructionCacheSharingTypesTestData.forEach((testVal) => {
                            expect(isRunInstructionCacheSharingTypes(testVal)).toBe(true)
                        })
                    })

                    test(`isRunInstructionMountTypeBindCommon`, () => {
                        RunInstructionMountTypeBindCommonTestData.forEach((testVal) => {
                            expect(isRunInstructionMountTypeBindCommon(testVal)).toBe(true)
                        })
                    })

                    test(`isRunInstructionMountTypeBindReadWrite`, () => {
                        RunInstructionMountTypeBindCommonTestData.forEach((testVal) => {
                            expect(isRunInstructionMountTypeBindReadWrite({ ...testVal, readwrite: true })).toBe(true)
                            expect(isRunInstructionMountTypeBindReadWrite({ ...testVal, readwrite: false })).toBe(true)
                            expect(isRunInstructionMountTypeBindReadWrite({ ...testVal, rw: true })).toBe(false)
                            expect(isRunInstructionMountTypeBindReadWrite({ ...testVal, rw: false })).toBe(false)
                        })
                    })

                    test(`isRunInstructionMountTypeBindRW`, () => {
                        RunInstructionMountTypeBindCommonTestData.forEach((testVal) => {
                            expect(isRunInstructionMountTypeBindRW({ ...testVal, rw: true })).toBe(true)
                            expect(isRunInstructionMountTypeBindRW({ ...testVal, rw: false })).toBe(true)
                            expect(isRunInstructionMountTypeBindRW({ ...testVal, readwrite: true })).toBe(false)
                            expect(isRunInstructionMountTypeBindRW({ ...testVal, readwrite: false })).toBe(false)
                        })
                    })

                    test(`isRunInstructionMountTypeBind`, () => {
                        RunInstructionMountTypeBindCommonTestData.forEach((testVal) => {
                            expect(isRunInstructionMountTypeBind(testVal)).toBe(true)
                            expect(isRunInstructionMountTypeBind({ ...testVal, readwrite: true })).toBe(true)
                            expect(isRunInstructionMountTypeBind({ ...testVal, readwrite: false })).toBe(true)
                            expect(isRunInstructionMountTypeBind({ ...testVal, rw: true })).toBe(true)
                            expect(isRunInstructionMountTypeBind({ ...testVal, rw: false })).toBe(true)
                        })
                    })

                    test(`isRunInstructionMountTypeCacheCommon`, () => {
                        RunInstructionMountTypeCacheCommonTestData.forEach((testVal) => {
                            expect(isRunInstructionMountTypeCacheCommon(testVal)).toBe(true)
                        })
                    })

                    test(`isRunInstructionMountTypeCacheReadOnly`, () => {
                        RunInstructionMountTypeCacheCommonTestData.forEach((testVal) => {
                            expect(isRunInstructionMountTypeCacheReadOnly({ ...testVal, readonly: true })).toBe(true)
                            expect(isRunInstructionMountTypeCacheReadOnly({ ...testVal, readonly: false })).toBe(true)
                            expect(isRunInstructionMountTypeCacheReadOnly({ ...testVal, ro: true })).toBe(false)
                            expect(isRunInstructionMountTypeCacheReadOnly({ ...testVal, ro: false })).toBe(false)
                        })
                    })

                    test(`isRunInstructionMountTypeCacheRO`, () => {
                        RunInstructionMountTypeCacheCommonTestData.forEach((testVal) => {
                            expect(isRunInstructionMountTypeCacheRO({ ...testVal, ro: true })).toBe(true)
                            expect(isRunInstructionMountTypeCacheRO({ ...testVal, ro: false })).toBe(true)
                            expect(isRunInstructionMountTypeCacheRO({ ...testVal, readonly: true })).toBe(false)
                            expect(isRunInstructionMountTypeCacheRO({ ...testVal, readonly: false })).toBe(false)
                        })
                    })

                    test(`isRunInstructionMountTypeCache`, () => {
                        RunInstructionMountTypeCacheCommonTestData.forEach((testVal) => {
                            expect(isRunInstructionMountTypeCache(testVal)).toBe(true)
                            expect(isRunInstructionMountTypeCache({ ...testVal, readonly: true })).toBe(true)
                            expect(isRunInstructionMountTypeCache({ ...testVal, readonly: false })).toBe(true)
                            expect(isRunInstructionMountTypeCache({ ...testVal, ro: true })).toBe(true)
                            expect(isRunInstructionMountTypeCache({ ...testVal, ro: false })).toBe(true)
                        })
                    })

                    test(`isRunInstructionMountTypeSecret`, () => {
                        RunInstructionMountTypeSecretTestData.forEach((testVal) => {
                            expect(isRunInstructionMountTypeSecret(testVal)).toBe(true)
                        })
                    })

                    test(`isRunInstructionMountTypeSSH`, () => {
                        RunInstructionMountTypeSSHTestData.forEach((testVal) => {
                            expect(isRunInstructionMountTypeSSH(testVal)).toBe(true)
                        })
                    })

                    test(`isRunInstructionMountTypeTmpFS`, () => {
                        RunInstructionMountTypeTmpFSTestData.forEach((testVal) => {
                            expect(isRunInstructionMountTypeTmpFS(testVal)).toBe(true)
                        })
                    })

                    test(`isRunInstructionMountRunArg`, () => {
                        RunInstructionMountRunParamsTestData.forEach((testVal) => {
                            expect(isRunInstructionMountParam(testVal)).toBe(true)
                        })
                    })

                    test(`isRunInstructionNetworkRunArg`, () => {
                        RunInstructionNetworkRunParamTestData.forEach((testVal) => {
                            expect(isRunInstructionNetworkParam(testVal)).toBe(true)
                        })
                    })

                    test(`isRunInstructionParams`, () => {
                        RunInstructionParamsTestData.forEach((testVal) => {
                            expect(isRunInstructionParams([testVal])).toBe(true)
                        })
                    })

                    test(`isRunInstructionSecurityRunArg`, () => {
                        RunInstructionSecurityRunParamTestData.forEach((testVal) => {
                            expect(isRunInstructionSecurityParam(testVal)).toBe(true)
                        })
                    })

                    test(`isRunInstructions`, () => {
                        RunInstructionsTestData.forEach((testVal) => {
                            expect(isRunInstructions(testVal)).toBe(true)
                        })
                    })
                })
            })
        })
    })
})
