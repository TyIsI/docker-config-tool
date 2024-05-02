const { DockerConfigTool } = require('../dist/index.js')

const dct = new DockerConfigTool()

const workspaceStage = dct.createStage({ from: 'scratch', as: 'workspace' })

workspaceStage.addCopy('.', '/workspace').setLinked()

const baseStage = dct.createStage({ from: 'node:lts-alpine', as: 'base' })

baseStage.addRun('apk add --no-cache libc6-compat vips vips-cpp')

baseStage.addCommand('npm', 'start')

const buildStage = dct.createStage({ from: baseStage, as: 'app-build' })

buildStage.addWorkdir('/build')

buildStage.addUser(54321, 54321)

buildStage
    .addCopy('/workspace/app/frontend', '/build')
    .setFrom(workspaceStage)
    .setLinked()
    .setChown('runtime:runtime')

// buildStage.addRun(["pnpm", "run", "build"])

// const prodStage = dct.createStage({ from: 'nginx:stable', as: 'app-prod' })
const prodStage = dct.createStage({ from: 'nginx:stable' })

prodStage.addExpose('3000')

prodStage.addCopy('/build/dist/', '/usr/share/nginx/html/').setFrom(buildStage).setLinked()



// ETC

console.log(dct.toString())
