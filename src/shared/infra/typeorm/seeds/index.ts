import { dataBaseConnection } from '../database/dataSource';
import adminUser from './Admin.seed';
import groupUser from './GroupUser.seed';

async function create() {
  const connection = await dataBaseConnection.initialize();
  await groupUser(connection)
  await adminUser(connection)
  await dataBaseConnection.destroy();
};

create().then(() => console.log('Seed OK!'))