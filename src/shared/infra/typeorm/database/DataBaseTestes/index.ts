import { DataSource, DataSourceOptions } from 'typeorm'

export const createTestDatabase = async () => {
    const options: DataSourceOptions = {
        type: 'sqlite',
        database: ':memory:',
        entities: ['src/shared/infra/typeorm/entities/*.ts'],
        synchronize: true,
        logging: false,
    }

    const dataSourceTest = new DataSource(options)
    await dataSourceTest.initialize()
    return dataSourceTest
}
