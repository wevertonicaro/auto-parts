import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { logger } from '../../../../shared/utils/logger'
import { DeleteAutomakerService } from './DeleteAutomaker.service'

export class DeleteAutomakerController {
    async handler(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        try {
            const deleteAutomakerService = container.resolve(DeleteAutomakerService)

            const automaker = await deleteAutomakerService.execute(Number(id))

            logger.info('Montadora deletada com sucesso!')
            return response.status(204).json(automaker)
        } catch (error) {
            logger.error('Error ao deletar montadora', { error: error.message })
            return response.status(400).json({ error: error.message })
        }
    }
}
