import { DataSource, DataSourceOptions } from 'typeorm'

export const createTestDatabase = async () => {
    const options: DataSourceOptions = {
        type: 'sqlite',
        database: ':memory:',
        entities: ['src/shared/infra/typeorm/entities/*.ts'],
        synchronize: true,
        logging: false,
    }

    const dataSource = new DataSource(options)
    await dataSource.initialize()
    return dataSource
}
