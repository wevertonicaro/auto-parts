import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { logger } from '../../../../utils/logger'
import { IUpdateCarDto } from '../../dtos/Car.dto'
import { UpdateCarService } from './UpdateCar.service'

export class UpdateCarController {
    async handler(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const data: IUpdateCarDto = request.body

        data.id = Number(id)

        try {
            const updateCarService = container.resolve(UpdateCarService)

            const car = await updateCarService.execute(data)

            logger.info({ message: `Veículo atualizado com sucesso!` })
            return response.status(200).json(car)
        } catch (error) {
            logger.error(error.message)
            return response.status(400).json({ error: error.message })
        }
    }
}
