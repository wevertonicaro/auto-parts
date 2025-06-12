import * as fs from 'fs'
import * as path from 'path'
import { inject, injectable } from 'tsyringe'
import AppError from '../../../../http/error/AppError'
import { Car } from '../../../../shared/infra/typeorm/entities/Car'
import { readCsv } from '../../../../shared/utils/CsvReader/CsvReader'
import { readExcel } from '../../../../shared/utils/ExcelReader/ExcelReader'
import { IAutomakerRepository } from '../../../Automaker/repositories/IAutomakerRepository'
import { ImportCarResult } from '../../dtos/Car.dto'
import { ICarRepository } from '../../repositories/ICarRepository'

@injectable()
export class ImportCarListService {
    constructor(
        @inject('CarRepository')
        private carRepository: ICarRepository,

        @inject('AutomakerRepository')
        private automakerRepository: IAutomakerRepository
    ) {}

    async execute(file: Express.Multer.File): Promise<ImportCarResult> {
        const fileExtension = path.extname(file.originalname).toLowerCase()

        if (!['.csv', '.xlsx'].includes(fileExtension)) {
            throw new AppError('O arquivo enviado deve ser no formato CSV ou XLSX.')
        }

        let carsData: { descricao: string; marca: string }[] = []

        try {
            if (fileExtension === '.csv') {
                const rawCsvData = await readCsv<{ descricao: string; marca: string }>(file.path, {
                    headers: true,
                })
                if (
                    rawCsvData.length > 0 &&
                    rawCsvData[0]['_0'] === 'descricao' &&
                    rawCsvData[0]['_1'] === 'marca'
                ) {
                    carsData = rawCsvData.slice(1).map(row => ({
                        descricao: row['_0']?.trim(),
                        marca: row['_1']?.trim(),
                    }))
                } else {
                    throw new AppError('Formato do CSV inválido. Verifique os cabeçalhos.')
                }
            } else if (fileExtension === '.xlsx') {
                const rawExcelData = await readExcel<{ descricao: string; marca: string }>(
                    file.path
                )

                carsData = rawExcelData.slice(1).map(row => ({
                    descricao: row[0]?.trim(),
                    marca: row[1]?.trim(),
                }))
            }

            await fs.promises.unlink(file.path)

            const totalRecords = carsData.length
            let importedRecords: Car[] = []
            let duplicateRecords = 0
            let errorRecords = 0

            for (const carData of carsData) {
                if (!carData.descricao && !carData.marca) continue

                const existingAutomaker = await this.automakerRepository.findByDescription(
                    carData.marca
                )

                let automakerId: number

                if (!existingAutomaker) {
                    const createAutomaker = await this.automakerRepository.create({
                        description: carData.marca,
                    })

                    automakerId = createAutomaker.id
                } else {
                    automakerId = existingAutomaker.id
                }

                const existingCar = await this.carRepository.findByDescription(carData.descricao)

                if (existingCar) {
                    duplicateRecords++
                    continue
                }

                const car = await this.carRepository.create({
                    description: carData.descricao,
                    automakerId,
                })

                if (car.id) {
                    importedRecords.push(car)
                } else {
                    console.log('Error: ', carData)
                    errorRecords++
                    continue
                }
            }

            console.info(`Importados: ${importedRecords.length}`)

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
