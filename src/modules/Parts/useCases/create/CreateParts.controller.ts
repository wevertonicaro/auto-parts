import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { logger } from '../../../../shared/utils/logger'
import { ICreatePartsDto } from '../../dtos/Parts.dto'
import { CreatePartsService } from './CreateParts.service'

export class CreatePartsController {
    async handler(request: Request, response: Response): Promise<Response> {
        const data: ICreatePartsDto = request.body
        try {
            const createPartsService = container.resolve(CreatePartsService)

            const parts = await createPartsService.execute(data)

            logger.info({ message: 'Peça criada com sucesso!', payload: data })
            return response.status(201).json(parts)
        } catch (error) {
            logger.error({
                message: 'Error ao criar peça',
                error: error.message,
                payload: data,
            })
            return response.status(400).json({ error: error.message })
        }
    }
}
