const generateMap = (
    baseObj: Record<string, unknown>,
    variants: Array<Record<string, unknown>>
): Array<Record<string, unknown>> =>
    variants.map((variantData) => ({
        ...baseObj,
        ...variantData
    }))

export const RunInstructionBooleanFieldsTestData = ['rw', 'readwrite', 'ro', 'readonly', 'required']

export const RunInstructionCacheSharingTypesTestData = ['shared', 'private', 'locked']

export const RunInstructionNetworkRunParamTestData = ['default', 'none', 'host']

export const RunInstructionSecurityRunParamTestData = ['sandbox', 'insecure']

export const RunInstructionsTestData = ['/bin/sh', '/bin/sh -c', ['/bin/sh'], ['/bin/sh -c'], ['/bin/sh', '-c']]

const RunInstructionFileModeVariants = [1777, '1777']

const RunInstructionUIDGIDVariants = [
    { uid: 123 },
    { gid: 123 },
    { uid: 123, gid: 123 },
    { uid: '123' },
    { gid: '123' },
    { uid: '123', gid: '123' }
]

const MountTypeBindBase = { type: 'bind', target: '/target' }

const MountTypeBindVariants = [{}, { from: 'test' }, { source: '/source' }, { from: 'test', source: '/source' }]

export const RunInstructionMountTypeBindCommonTestData = generateMap(MountTypeBindBase, MountTypeBindVariants)

const MountTypeCacheBase = { type: 'cache', target: '/target' }

const MountTypeCacheVariants = [
    {},
    { id: 'test' },
    { from: 'test' },
    { from: 'test', source: '/source' },
    ...RunInstructionCacheSharingTypesTestData.map((variantData) => ({ sharing: variantData })),
    ...RunInstructionFileModeVariants.map((variantData) => ({ mode: variantData })),
    ...RunInstructionUIDGIDVariants
]

export const RunInstructionMountTypeCacheCommonTestData = generateMap(MountTypeCacheBase, MountTypeCacheVariants)

const MountTypeSecretBase = { type: 'secret', id: 'test' }

const MountTypeSecretVariants = [
    {},
    { target: '/test' },
    { required: true },
    { required: false },
    ...RunInstructionFileModeVariants.map((variantData) => ({ mode: variantData })),
    ...RunInstructionUIDGIDVariants
]

export const RunInstructionMountTypeSecretTestData = generateMap(MountTypeSecretBase, MountTypeSecretVariants)

const MountTypeSSHBase = { type: 'ssh', id: 'test' }

const MountTypeSSHVariants = [
    { target: '/test' },
    { required: true },
    { required: false },
    ...RunInstructionFileModeVariants.map((variantData) => ({ mode: variantData })),
    ...RunInstructionUIDGIDVariants
]

export const RunInstructionMountTypeSSHTestData = generateMap(MountTypeSSHBase, MountTypeSSHVariants)

export const RunInstructionMountTypeTmpFSTestData = [{ type: 'tmpfs', target: '/target', size: 1024 * 1024 }]

export const RunInstructionMountRunParamsTestData = [
    ...RunInstructionMountTypeBindCommonTestData,
    ...RunInstructionMountTypeCacheCommonTestData,
    ...RunInstructionMountTypeSecretTestData,
    ...RunInstructionMountTypeSSHTestData,
    ...RunInstructionMountTypeTmpFSTestData
]

const ParamsObjectBase = {}
const ParamsObjectVariants = RunInstructionsTestData.map((variantData) => ({
    commands: variantData
}))

export const RunInstructionParamsObjectTestData = generateMap(ParamsObjectBase, ParamsObjectVariants)

export const RunInstructionParamsTestData = [
    ...RunInstructionsTestData,
    ...RunInstructionParamsObjectTestData,
    ...RunInstructionParamsObjectTestData.reduce<Array<Record<string, unknown>>>((collector, baseParamsObj) => {
        return collector.concat(
            generateMap(
                baseParamsObj,
                RunInstructionMountRunParamsTestData.map((mount) => ({ mount }))
            )
        )
    }, [])
]
