import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { logger } from '../../../../shared/utils/logger'
import { ImportCarListService } from './ImportCarList.service'

export class ImportCarListController {
    async handler(request: Request, response: Response): Promise<void> {
        const file = request.file

        if (!file) {
            response.status(400).json({ error: 'Nenhum arquivo enviado para importação.' })
        }

        try {
            const createCarsService = container.resolve(ImportCarListService)

            const result = await createCarsService.execute(file)

            logger.info({
                message: 'Montadoras importadas com sucesso!',
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
            logger.error('Error ao importar veículos.', { error: error.message })

            response.status(400).json({ error: error.message })
        }
    }
}
