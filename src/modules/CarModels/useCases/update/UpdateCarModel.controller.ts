import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { logger } from '../../../../shared/utils/logger'
import { IUpdateCarModelDto } from '../../dtos/CarModels.dto'
import { UpdateCarModelService } from './UpdateCarModel.service'

export class UpdateCarModelController {
    async handler(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const data: IUpdateCarModelDto = request.body

        data.id = Number(id)

        try {
            const updateCarModelService = container.resolve(UpdateCarModelService)

            const car = await updateCarModelService.execute(data)

            logger.info({ message: `Modelo de veículo atualizado com sucesso!` })
            return response.status(200).json(car)
        } catch (error) {
            logger.error(error.message)
            return response.status(400).json({ error: error.message })
        }
    }
}
