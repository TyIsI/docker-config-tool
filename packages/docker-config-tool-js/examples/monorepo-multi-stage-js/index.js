const { DockerConfigTool } = require('../../dist/index.js')

const dct = new DockerConfigTool()

dct.withArg('PRIVATE_REGISTRY_PROXY_URI')
dct.withArg('TAG')

const workspaceStage = dct.withStage({ from: 'scratch', as: 'workspace' })

workspaceStage.withCopy('.', '/workspace').setLinked()

const baseStage = dct.withStage({ from: 'node:lts-alpine', as: 'base' })

baseStage.withRun('apk add --no-cache libc6-compat vips vips-cpp')

baseStage.withRun('npm', 'install').setOnBuild()

baseStage.withCmd('npm', 'start')

const buildStage = dct.withStage({ from: baseStage, as: 'app-build' })

buildStage.withWorkDir('/build')

buildStage.withUser(54321, 54321)

buildStage.withCopy('/workspace/app/frontend', '/build').setFrom(workspaceStage).setLinked().setChown('runtime:runtime')

buildStage.withRun(['pnpm', 'run', 'build'])

const prodStage = dct.withStage({ from: 'nginx:stable', as: 'app-prod' })

prodStage.withExpose('3000')

prodStage.withCopy('/build/dist/', '/usr/share/nginx/html/').setFrom(buildStage).setLinked()

// ETC

console.log(dct.toString())
