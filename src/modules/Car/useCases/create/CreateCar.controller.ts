import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { logger } from '../../../../shared/utils/logger'
import { ICreateCarDto } from '../../dtos/Car.dto'
import { CreateCarService } from './CreateCar.service'

export class CreateCarController {
    async handler(request: Request, response: Response): Promise<Response> {
        const data: ICreateCarDto = request.body
        try {
            const createCarService = container.resolve(CreateCarService)

            const car = await createCarService.execute(data)

            logger.info({ message: 'Veículo criado com sucesso!', payload: data })
            return response.status(201).json(car)
        } catch (error) {
            logger.error('Error ao criar veículo', { error: error.message, payload: data })
            return response.status(400).json({ error: error.message })
        }
    }
}
