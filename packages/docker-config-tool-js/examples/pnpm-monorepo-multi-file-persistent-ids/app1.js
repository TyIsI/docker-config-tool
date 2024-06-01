const base = require('./base')
const build = require('./build')
const { dct } = require('./common')

const app1 = dct.withStage({ from: base, as: 'app1' })

app1.withCopy({ sources: '/prod/app1', destination: '/prod/app1', from: build })

app1.withWorkDir('/prod/app1')

app1.withExpose(8000)

app1.withCmd('pnpm', 'start')

module.exports = app1
