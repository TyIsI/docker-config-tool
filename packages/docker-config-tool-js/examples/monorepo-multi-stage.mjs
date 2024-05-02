import { DockerConfigTool } from '../dist/index.mjs'

const dct = new DockerConfigTool()

const workspaceStage = dct.createStage({ from: 'scratch', as: 'workspace' })

workspaceStage.createCOPY('.', '/workspace').setLinked()

const baseStage = dct.createStage({ from: 'node:lts-alpine', as: 'base' })

baseStage.createRUN('apk add --no-cache libc6-compat vips vips-cpp')

baseStage.createCMD('npm', 'start')

const imageBuildStage = dct.createStage({ from: baseStage, as: 'image-build' })

imageBuildStage.createUSER(54321, 54321)

imageBuildStage
    .createCOPY('/workspace/services/image-engine', '/build')
    .setFrom(workspaceStage)
    .setLinked()
    .setChown('runtime:runtime')

// ETC

console.log(dct.toString())
