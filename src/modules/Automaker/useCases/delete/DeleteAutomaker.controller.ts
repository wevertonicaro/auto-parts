import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { logger } from '../../../../shared/utils/logger'
import { DeleteAutomakerService } from './DeleteAutomaker.service'

export class DeleteAutomakerController {
    async handler(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        try {
            const deleteAutomakerService = container.resolve(DeleteAutomakerService)

            const group = await deleteAutomakerService.execute(Number(id))

            logger.info({ message: 'Montadora deletada com sucesso!' })
            return response.status(204).json(group)
        } catch (error) {
            logger.error(error.message)
            return response.status(400).json({ error: error.message })
        }
    }
}
