import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { logger } from '../../../../utils/logger'
import { ICreateAutomakerDto } from '../../dtos/Automaker.dto'
import { CreateAutomakerService } from './CreateAutomaker.service'

export class CreateAutomakerController {
    async handler(request: Request, response: Response): Promise<Response> {
        const data: ICreateAutomakerDto = request.body
        try {
            const createAutomakerService = container.resolve(CreateAutomakerService)

            const automaker = await createAutomakerService.execute(data)

            logger.info({ message: 'Monatdora criada com sucesso!' })
            return response.status(201).json(automaker)
        } catch (error) {
            logger.error(error.message)
            return response.status(400).json({ error: error.message })
        }
    }
}
