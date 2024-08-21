import 'dotenv/config';

const config = {
  ENV: process.env.NODE_ENV,
  SERVER: {
    NAME: process.env.NAME_PM2,
    DESCRIPTION: process.env.NAME_PM2,
    PORT: process.env.PORT ?? process.env.API_PORT,
    BASEPATH: process.env.HOST ? '/api' : '/api-auto-parts/v1',
    HOST: process.env.HOST ?? process.env.API_HOST,
    CERTIFIED: {
      KEY: process.env.CERTIFIED_KEY,
      CA: process.env.CERTIFIED_CA,
      FILE: process.env.CERTIFIED_FILE,
      PFX: process.env.CERTIFIED_PFX,
      PASSPHRASE: process.env.CERTIFIED_PASSPHRASE,
    },
  },
  DATABASE: {
    TYPE: process.env.DB_TYPE || 'mysql',
    HOST: process.env.DB_HOST,
    PORT: Number(process.env.DB_PORT),
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    NAME: process.env.DB_DATABASE,
  },
  SHARED: {
    CONTACT: 'weverton.dev@gmail.com',
  },
  ALLOW_DOMAINS: [],
};

export { config };
