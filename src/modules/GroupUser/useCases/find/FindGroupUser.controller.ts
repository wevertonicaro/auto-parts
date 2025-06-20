import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { logger } from '../../../../shared/utils/logger'
import { GetGroupUserService } from './FindGroupUser.service'

export class GetGroupUserController {
    async handler(request: Request, response: Response): Promise<Response> {
        const { id, description } = request.query
        try {
            const getGroupUserService = container.resolve(GetGroupUserService)

            const group = await getGroupUserService.execute(Number(id), String(description))

            logger.info({ message: `Grupo(s) encontrada(s) com sucesso!` })
            return response.status(200).json(group)
        } catch (error) {
            logger.error(error.message)
            return response.status(400).json({ error: error.message })
        }
    }
}
