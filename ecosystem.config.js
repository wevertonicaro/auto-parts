const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  apps: [
    {
      name: process.env.NAME_PM2,
      interpreter: 'node',
      script: 'node_modules/ts-node/dist/bin.js',
      args: '-r tsconfig-paths/register --transpile-only ./src/http/main/main.ts',
      watch: ['src'],
      watch_delay: 1000,
      ignore_watch: ['node_modules', 'temp'],
      watch_options: {
        followSymlinks: false,
      },
      max_memory_restart: '500M',
      log_date_format: 'DD/MM/YYYY HH:mm:ss',
      output: './log_pm2/out.log',
      error: './log_pm2/error.log',
      log_file: './log_pm2/combined.log',
      merge_logs: true,
      env: {
        NODE_ENV: process.env.NODE_ENV,
        TZ: 'America/Sao_Paulo',
      },
    },
  ],
};