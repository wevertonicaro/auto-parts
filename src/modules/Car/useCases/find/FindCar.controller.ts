import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { logger } from '../../../../utils/logger'
import { GetCarService } from './FindCar.service'

export class GetCarController {
    async handler(request: Request, response: Response): Promise<Response> {
        const { id, description } = request.query
        try {
            const getCarService = container.resolve(GetCarService)

            const group = await getCarService.execute(Number(id), String(description))

            logger.info({ message: `Montadora(s) encontrada(s) com sucesso!` })
            return response.status(200).json(group)
        } catch (error) {
            logger.error(error.message)
            return response.status(400).json({ error: error.message })
        }
    }
}
