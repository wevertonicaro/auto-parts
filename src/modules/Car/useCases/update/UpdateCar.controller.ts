import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { logger } from '../../../../shared/utils/logger'
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

            logger.info({ message: `Veículo atualizado com sucesso!`, payload: { id, data } })
            return response.status(200).json(car)
        } catch (error) {
            logger.error('Error ao atualizar veículo.', { error: error.message, payload: data })
            return response.status(400).json({ error: error.message })
        }
    }
}
