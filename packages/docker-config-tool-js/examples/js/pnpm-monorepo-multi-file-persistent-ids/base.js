const { dct } = require('./common')

const base = dct.withStage({ from: 'node:20-slim' })

base.withEnv('PNPM_HOME="/pnpm"')
base.withEnv('PATH="$PNPM_HOME:$PATH"')

base.withRun('corepack enable')

module.exports = base
