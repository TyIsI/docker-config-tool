const base = require('./base')
const build = require('./build')
const { dct } = require('./common')

const app2 = dct.withStage({ from: base, as: 'app2' })

app2.withCopy({ sources: '/prod/app2', destination: '/prod/app2', from: build })

app2.withWorkDir('/prod/app2')

app2.withExpose(8001)

app2.withCmd('pnpm', 'start')

module.exports = app2
