import { config } from './src/config/api';

function shouldEnableLogging(env: string | undefined): boolean {
  return env === 'development';
}

const env = config.ENV;
const loggingEnabled = shouldEnableLogging(env);

const ORMConfig = {
  type: config.DATABASE.TYPE,
  host: config.DATABASE.HOST,
  port: config.DATABASE.PORT,
  username: config.DATABASE.USER,
  password: config.DATABASE.PASSWORD,
  database: config.DATABASE.NAME,
  synchronize: false,
  logging: loggingEnabled,
  logger: 'file',
  migrations: ['src/shared/infra/typeorm/migrations/*.ts'],
  entities: ['src/shared/infra/typeorm/entities/*.ts'],
  cli: {
    migrationsDir: 'src/shared/infra/typeorm/migrations',
    entitiesDir: 'src/shared/infra/typeorm/entities',
  },
  extra: {
    connectionLimit: 5
  },
};

export default ORMConfig