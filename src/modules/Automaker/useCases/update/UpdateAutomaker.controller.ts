import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { logger } from '../../../../shared/utils/logger'
import { IUpdateAutomakerDto } from '../../dtos/Automaker.dto'
import { UpdateAutomakerService } from './UpdateAutomaker.service'

export class UpdateAutomakerController {
    async handler(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const data: IUpdateAutomakerDto = request.body

        data.id = Number(id)

        try {
            const updateAutomakerService = container.resolve(UpdateAutomakerService)

            const automaker = await updateAutomakerService.execute(data)

            logger.info('Montadora atualizada com sucesso!', { payload: { id, data } })
            return response.status(200).json(automaker)
        } catch (error) {
            logger.error('Error ao atualizar montadora', {
                error: error.message,
                payload: { id, data },
            })
            return response.status(400).json({ error: error.message })
        }
    }
}
