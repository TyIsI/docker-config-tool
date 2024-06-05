const base = require('./base')
const { dct } = require('./common')

const pnpmMountOptions = {
    type: 'cache',
    id: 'pnpm',
    target: '/pnpm/store'
}

const build = dct.withStage({ from: base })

build.withCopy('.', '/usr/src/app')

build.withWorkDir('/usr/src/app')

// @ts-ignore
build.withRun('pnpm install --frozen-lockfile').setMount(pnpmMountOptions)

build.withRun('pnpm run -r build')

build.withRun('pnpm deploy --filter=app1 --prod /prod/app1')
build.withRun('pnpm deploy --filter=app2 --prod /prod/app2')

module.exports = build
