import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { logger } from '../../../../shared/utils/logger'
import { DeleteCarService } from './DeleteCar.service'

export class DeleteCarController {
    async handler(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        try {
            const deleteCarService = container.resolve(DeleteCarService)

            const group = await deleteCarService.execute(Number(id))

            logger.info({ message: 'Veículo deletado com sucesso!' })
            return response.status(204).json(group)
        } catch (error) {
            logger.error('Error ao deletar veículo', { error: error.message })
            return response.status(400).json({ error: error.message })
        }
    }
}
