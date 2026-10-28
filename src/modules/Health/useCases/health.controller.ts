
import { Request, Response } from 'express'
import { connectMongo } from '../../../shared/infra/mongodb'
import { dataBaseConnection } from '../../../shared/infra/typeorm/database/dataSource'

export class HealthController {
    public async liveness(req: Request, res: Response): Promise<Response> {
        return res.status(200).json({
            status: 'ok',
            timestamp: new Date().toISOString(),
        })
    }

    public async readiness(req: Request, res: Response): Promise<Response> {
        const checks: Record<string, string> = {
            database: 'ok',
            mongodb: 'ok',
        }

        try {
            if (!dataBaseConnection.isInitialized) {
                checks.database = 'error'
            }

            if (!dataBaseConnection.isInitialized) {
                throw new Error('Database not initialized')
            }

            await connectMongo()

            const ready = Object.values(checks).every(
                (status) => status === 'ok'
            )

            return res.status(ready ? 200 : 503).json({
                status: ready ? 'ok' : 'error',
                checks,
                timestamp: new Date().toISOString(),
            })
        } catch (error) {
            checks.database = dataBaseConnection.isInitialized
                ? checks.database
                : 'error'

            checks.mongodb = 'error'

            return res.status(503).json({
                status: 'error',
                checks,
                timestamp: new Date().toISOString(),
            })
        }
    }
}
