import * as fs from 'fs'
import { ImportAutomakerResult } from 'modules/Automaker/dtos/Automaker.dto'
import { IAutomakerRepository } from 'modules/Automaker/repositories/IAutomakerRepository'
import * as path from 'path'
import { inject, injectable } from 'tsyringe'
import { readCsv } from 'utils/CsvReader/CsvReader'
import { readExcel } from 'utils/ExcelReader/ExcelReader'
import AppError from '../../../../http/error/AppError'

@injectable()
export class ImportAutomakerListService {
    constructor(
        @inject('AutomakerRepository')
        private automakerRepository: IAutomakerRepository
    ) {}

    async execute(file: Express.Multer.File): Promise<ImportAutomakerResult> {
        const fileExtension = path.extname(file.originalname).toLowerCase()

        if (!['.csv', '.xlsx'].includes(fileExtension)) {
            throw new AppError('O arquivo enviado deve ser no formato CSV ou XLSX.')
        }

        let automakersData: { description: string }[] = []

        try {
            if (fileExtension === '.csv') {
                const rawCsvData = await readCsv<{ _0: string }>(file.path, { headers: true })
                automakersData = rawCsvData.slice(1).map(row => ({
                    description: row._0.trim(),
                }))
            } else if (fileExtension === '.xlsx') {
                const rawExcelData = await readExcel<{ _0: string }>(file.path)
                automakersData = rawExcelData.slice(1).map(row => ({
                    description: row._0.trim(),
                }))
            }

            fs.unlinkSync(file.path)

            const totalRecords = automakersData.length
            let importedRecords = 0
            let duplicateRecords = 0

            for (const automakerData of automakersData) {
                if (!automakerData.description) continue

                const existingAutomaker = await this.automakerRepository.findByDescription(
                    automakerData.description
                )

                if (existingAutomaker) {
                    duplicateRecords++
                    continue
                }

                await this.automakerRepository.create({
                    description: automakerData.description,
                })

                importedRecords++
            }

            return {
                totalRecords,
                importedRecords,
                duplicateRecords,
            }
        } catch (error: any) {
            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path)
            }
            throw new AppError(error.message)
        }
    }
}
