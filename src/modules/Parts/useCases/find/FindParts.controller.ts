import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { logger } from '../../../../shared/utils/logger'
import { FindPartsService } from './FindParts.service'

export class FindPartsController {
    async handler(request: Request, response: Response): Promise<Response> {
        const { id, description, price, quantity, code } = request.query
        try {
            const getPartsService = container.resolve(FindPartsService)

            const parts = await getPartsService.execute(
                Number(id),
                String(description),
                String(code),
                Number(price),
                Number(quantity)
            )

            logger.info({ message: `Modelo(s) encontrado(s) com sucesso!` })
            return response.status(200).json(parts)
        } catch (error) {
            logger.error(error.message)
            return response.status(400).json({ error: error.message })
        }
    }
}
