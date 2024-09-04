import { dataBaseConnection } from '../database/dataSource';
import adminUser from './Admin.seed';
import groupUser from './GroupUser.seed';

async function create() {
  try {
    // Inicializa a conexão com o banco de dados
    const connection = await dataBaseConnection.initialize();
    
    // Executa os seeders
    await groupUser(connection);
    await adminUser(connection);

    console.log('Seed OK!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    // Fecha a conexão com o banco de dados
    await dataBaseConnection.destroy();
  }
}

create();
