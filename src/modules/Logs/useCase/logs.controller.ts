import { Request, Response } from 'express'
import { connectMongo } from '../../../shared/infra/mongodb'

export class LogsController {
    async getLogs(req: Request, res: Response) {
        try {
            const { level, email, errorText, startDate, endDate } = req.query

            if (!level || (level !== 'info' && level !== 'error')) {
                return res
                    .status(400)
                    .json({ message: 'Parâmetro level deve ser "info" ou "error"' })
            }

            const db = await connectMongo()
            const collectionName = level === 'error' ? 'logs_error' : 'logs_info'
            const collection = db.collection(collectionName)

            const filter: any = {}

            if (startDate || endDate) {
                filter.timestamp = {}
                if (startDate) filter.timestamp.$gte = new Date(startDate as string)
                if (endDate) filter.timestamp.$lte = new Date(endDate as string)
            }

            if (level === 'info' && email) {
                filter['metadata.payload.email'] = email
            }

            if (level === 'error' && errorText) {
                filter.message = { $regex: errorText as string, $options: 'i' }
            }

            const logs = await collection.find(filter).sort({ timestamp: -1 }).limit(100).toArray()

            return res.json(logs)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: 'Erro ao buscar logs' })
        }
    }
}
