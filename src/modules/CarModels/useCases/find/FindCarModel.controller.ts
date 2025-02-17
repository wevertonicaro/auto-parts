import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { logger } from '../../../../utils/logger'
import { FindCarModelService } from './FindCarModel.service'

export class FindCarModelController {
    async handler(request: Request, response: Response): Promise<Response> {
        const { id, description, carId } = request.query
        try {
            const getCarModelService = container.resolve(FindCarModelService)

            const carModels = await getCarModelService.execute(
                Number(id),
                String(description),
                Number(carId)
            )

            logger.info({ message: `Modelo(s) encontrado(s) com sucesso!` })
            return response.status(200).json(carModels)
        } catch (error) {
            logger.error(error.message)
            return response.status(400).json({ error: error.message })
        }
    }
}
