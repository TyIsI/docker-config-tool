import { DockerConfigTool } from '../../dist/index.mjs'

const dct = new DockerConfigTool()

const workspaceStage = dct.withStage({ from: 'scratch', as: 'workspace' })

workspaceStage.withCopy('.', '/workspace').setLinked()

const baseStage = dct.withStage({ from: 'node:lts-alpine', as: 'base' })

baseStage.withRun('apk add --no-cache libc6-compat vips vips-cpp')

baseStage.withCmd('npm', 'start')

const imageBuildStage = dct.withStage({ from: baseStage, as: 'image-build' })

imageBuildStage.withUser(54321, 54321)

imageBuildStage
    .withCopy('/workspace/services/image-engine', '/build')
    .setFrom(workspaceStage)
    .setLinked()
    .setChown('runtime:runtime')

// ETC

console.log(dct.toString())
