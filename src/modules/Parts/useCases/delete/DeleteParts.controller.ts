import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { logger } from '../../../../shared/utils/logger'
import { DeletePartsService } from './DeleteParts.service'

export class DeletePartsController {
    async handler(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        try {
            const deletePartsService = container.resolve(DeletePartsService)

            const parts = await deletePartsService.execute(Number(id))

            logger.info({ message: 'Peça deletada com sucesso!' })
            return response.status(204).json(parts)
        } catch (error) {
            logger.error(error.message)
            return response.status(400).json({ error: error.message })
        }
    }
}
