const { DockerConfigTool } = require('../dist/index.js')

const dct = new DockerConfigTool()

const workspaceStage = dct.createStage({ from: 'scratch', as: 'workspace' })

workspaceStage.createCOPY('.', '/workspace').setLinked()

const baseStage = dct.createStage({ from: 'node:lts-alpine', as: 'base' })

baseStage.createRUN('apk add --no-cache libc6-compat vips vips-cpp')

baseStage.createCMD('npm', 'start')

const buildStage = dct.createStage({ from: baseStage, as: 'app-build' })

buildStage.createWORKDIR('/build')

buildStage.createUSER(54321, 54321)

buildStage
    .createCOPY('/workspace/app/frontend', '/build')
    .setFrom(workspaceStage)
    .setLinked()
    .setChown('runtime:runtime')

// buildStage.createRUN(["pnpm", "run", "build"])

// const prodStage = dct.createStage({ from: 'nginx:stable', as: 'app-prod' })
const prodStage = dct.createStage({ from: 'nginx:stable' })

prodStage.createEXPOSE('3000')

prodStage.createCOPY('/build/dist/', '/usr/share/nginx/html/').setFrom(buildStage).setLinked()



// ETC

console.log(dct.toString())
