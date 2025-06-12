import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { logger } from '../../../../shared/utils/logger'
import { DeleteCarModelService } from './DeleteCarModel.service'

export class DeleteCarModelController {
    async handler(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        try {
            const deleteCarModelService = container.resolve(DeleteCarModelService)

            const carModel = await deleteCarModelService.execute(Number(id))

            logger.info({ message: 'Modelo de veículo deletado com sucesso!', payload: { id } })
            return response.status(204).json(carModel)
        } catch (error) {
            logger.error({
                message: 'Error ao deletar modelo do veículo',
                error: error.message,
                payload: { id },
            })
            return response.status(400).json({ error: error.message })
        }
    }
}
