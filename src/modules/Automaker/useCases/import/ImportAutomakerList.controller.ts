import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { logger } from '../../../../shared/utils/logger'
import { ImportAutomakerListService } from './ImportAutomakerList.service'

export class ImportAutomakerListController {
    async handler(request: Request, response: Response): Promise<void> {
        const file = request.file

        if (!file) {
            response.status(400).json({ error: 'Nenhum arquivo enviado para importação.' })
        }

        try {
            const createAutomakerService = container.resolve(ImportAutomakerListService)
            const result = await createAutomakerService.execute(file)

            logger.info('Montadoras importadas com sucesso!', {
                response: {
                    totalRecords: result.totalRecords,
                    importedRecords: result.importedRecords,
                    duplicateRecords: result.duplicateRecords,
                },
            })

            response.status(200).json({
                totalRecords: result.totalRecords,
                importedRecords: result.importedRecords,
                duplicateRecords: result.duplicateRecords,
            })
        } catch (error: any) {
            logger.error('Error ao importar montadoras', { error: error.message })
            response.status(400).json(error.message)
        }
    }
}
