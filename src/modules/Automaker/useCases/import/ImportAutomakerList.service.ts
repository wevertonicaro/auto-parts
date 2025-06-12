import * as fs from 'fs'
import * as path from 'path'
import { inject, injectable } from 'tsyringe'
import AppError from '../../../../http/error/AppError'
import { Automaker } from '../../../../shared/infra/typeorm/entities/Automaker'
import { readCsv } from '../../../../shared/utils/CsvReader/CsvReader'
import { readExcel } from '../../../../shared/utils/ExcelReader/ExcelReader'
import { ImportAutomakerResult } from '../../dtos/Automaker.dto'
import { IAutomakerRepository } from '../../repositories/IAutomakerRepository'

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

        let automakersData: { descricao: string }[] = []

        try {
            if (fileExtension === '.csv') {
                const rawCsvData = await readCsv<{ _0: string }>(file.path, { headers: true })
                automakersData = rawCsvData.slice(1).map(row => ({
                    descricao: row._0.trim(),
                }))
            } else if (fileExtension === '.xlsx') {
                const rawExcelData = await readExcel<{ descricao: string; marca: string }>(
                    file.path
                )

                automakersData = rawExcelData.slice(1).map(row => ({
                    descricao: row[0]?.trim(),
                }))
            }

            await fs.promises.unlink(file.path)

            const totalRecords = automakersData.length
            let importedRecords: Automaker[] = []
            let duplicateRecords = 0
            let errorRecords = 0

            for (const automakerData of automakersData) {
                if (!automakerData.descricao) continue

                const existingAutomaker = await this.automakerRepository.findByDescription(
                    automakerData.descricao
                )

                if (existingAutomaker) {
                    duplicateRecords++
                    continue
                }

                const automaker = await this.automakerRepository.create({
                    description: automakerData.descricao,
                })

                if (automaker.id) {
                    importedRecords.push(automaker)
                } else {
                    errorRecords++
                    continue
                }
            }

            return {
                totalRecords,
                importedRecords,
                duplicateRecords,
                errorRecords,
            }
        } catch (error: any) {
            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path)
            }
            throw new AppError(`Erro ao processar o arquivo ${file.originalname}: ${error.message}`)
        }
    }
}
