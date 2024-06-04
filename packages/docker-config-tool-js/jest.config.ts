import type { JestConfigWithTsJest } from 'ts-jest'

import { defaultsESM as tsjPreset } from 'ts-jest/presets'

const config: JestConfigWithTsJest = {
    clearMocks: true,

    collectCoverage: true,

    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/__tests__/**/*.ts',
        '!src/**/index.ts',
        '!src/**/constants.ts',
        '!src/**/schema.ts',
        '!src/**/types.ts',
        '!src/lib/instructions/common/**',
        '!**/node_modules/**',
        '!**/vendor/**'
    ],

    coverageDirectory: 'coverage',

    coveragePathIgnorePatterns: ['/node_modules/', '/vendor/'],

    // Fix to babel due to coverage issues
    coverageProvider: 'babel',

    coverageReporters: ['json', 'text', 'lcov', 'clover', 'html', 'html-spa'],

    coverageThreshold: {
        global: {
            branches: 95,
            functions: 95,
            lines: 99,
            statements: -25
        }
    },

    errorOnDeprecated: true,

    extensionsToTreatAsEsm: ['.ts'],

    moduleNameMapper: {
        '^lib/(.*)$': '<rootDir>/src/$1'
    },

    moduleDirectories: ['node_modules', 'src'],

    modulePaths: ['<rootDir>/src'],

    onlyChanged: false,

    testEnvironment: 'node',

    testMatch: [`${process.cwd()}/src/**/__tests__/**/*.ts`, `${process.cwd()}/src/**/*.(spec|test).ts`],

    testPathIgnorePatterns: ['/__fixtures__/', '/__utils__/'],

    transform: {
        ...tsjPreset.transform
    }
}

export default config
