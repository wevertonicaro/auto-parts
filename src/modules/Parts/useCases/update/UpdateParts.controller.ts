import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { logger } from '../../../../shared/utils/logger'
import { IUpdatePartsDto } from '../../dtos/Parts.dto'
import { UpdatePartsService } from './UpdateParts.service'

export class UpdatePartsController {
    async handler(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const data: IUpdatePartsDto = request.body

        data.id = Number(id)

        try {
            const updatePartsService = container.resolve(UpdatePartsService)

            const part = await updatePartsService.execute(data)

            logger.info({ message: `Peça atualizada com sucesso!`, payload: { id, data } })
            return response.status(200).json(part)
        } catch (error) {
            logger.error({
                message: 'Error ao atualizar peça',
                error: error.message,
                payload: { id, data },
            })
            return response.status(400).json({ error: error.message })
        }
    }
}
