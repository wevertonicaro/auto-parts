import { Db, MongoClient } from 'mongodb'
import { config } from '../../../config/api'

let client: MongoClient | null = null

let db: Db | null = null

export async function connectMongo(): Promise<Db> {
    if (db) return db

    if (!client) {
        client = new MongoClient(config.MONGO.URI)
        await client.connect()
    }

    db = client.db()
    return db
}
