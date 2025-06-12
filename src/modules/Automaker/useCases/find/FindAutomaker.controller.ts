import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { logger } from '../../../../shared/utils/logger'
import { GetAutomakerService } from './FindAutomaker.service'

export class GetAutomakerController {
    async handler(request: Request, response: Response): Promise<Response> {
        const { id, description } = request.query
        try {
            const getAutomakerService = container.resolve(GetAutomakerService)

            const group = await getAutomakerService.execute(Number(id), String(description))

            logger.info({ message: `Montadora(s) encontrada(s) com sucesso!` })
            return response.status(200).json(group)
        } catch (error) {
            logger.error(error.message)
            return response.status(400).json({ error: error.message })
        }
    }
}
