import { Config } from 'jest'

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src/modules'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    testRegex: '\\.(test|spec)\\.ts$',
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
}

export default config
