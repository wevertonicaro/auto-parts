import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { logger } from '../../../../shared/utils/logger'
import { ICreateCarModelDto } from '../../dtos/CarModels.dto'
import { CreateCarModelService } from './CreateCarModel.service'

export class CreateCarModelController {
    async handler(request: Request, response: Response): Promise<Response> {
        const data: ICreateCarModelDto = request.body
        try {
            const createCarModelService = container.resolve(CreateCarModelService)

            const carModel = await createCarModelService.execute(data)

            logger.info({ message: 'Modelo de veículo criado com sucesso!' })
            return response.status(201).json(carModel)
        } catch (error) {
            logger.error(error.message)
            return response.status(400).json({ error: error.message })
        }
    }
}
