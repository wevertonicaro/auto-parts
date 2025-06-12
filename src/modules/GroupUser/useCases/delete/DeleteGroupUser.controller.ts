import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { logger } from '../../../../shared/utils/logger'
import { DeleteGroupUserService } from './DeleteGroupUser.service'

export class DeleteGroupUserController {
    async handler(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        try {
            const deleteGroupUserService = container.resolve(DeleteGroupUserService)

            const group = await deleteGroupUserService.execute(Number(id))

            logger.info({ message: 'Grupo deletada com sucesso!', payload: { id } })
            return response.status(204).json(group)
        } catch (error) {
            logger.error({
                message: 'Error ao deletar grupo de usuário',
                error: error.message,
                payload: { id },
            })
            return response.status(400).json({ error: error.message })
        }
    }
}
