import { dataBaseConnection } from '../database/dataSource'
import adminUser from './Admin.seed'
import automakerSeed from './Automakers.seed'
import groupUser from './GroupUser.seed'

async function create() {
    try {
        const connection = await dataBaseConnection.initialize()

        await groupUser(connection)
        await adminUser(connection)
        await automakerSeed(connection)

        console.log('Seed OK!')
    } catch (error) {
        console.error('Error during seeding:', error)
    } finally {
        await dataBaseConnection.destroy()
    }
}

create()
