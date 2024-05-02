import { DockerConfigTool } from '../dist/index.mjs'

const dct = new DockerConfigTool()

const workspaceStage = dct.createStage({ from: 'scratch', as: 'workspace' })

workspaceStage.addCopy('.', '/workspace').setLinked()

const baseStage = dct.createStage({ from: 'node:lts-alpine', as: 'base' })

baseStage.addRun('apk add --no-cache libc6-compat vips vips-cpp')

baseStage.addCommand('npm', 'start')

const imageBuildStage = dct.createStage({ from: baseStage, as: 'image-build' })

imageBuildStage.addUser(54321, 54321)

imageBuildStage
    .addCopy('/workspace/services/image-engine', '/build')
    .setFrom(workspaceStage)
    .setLinked()
    .setChown('runtime:runtime')

// ETC

console.log(dct.toString())
