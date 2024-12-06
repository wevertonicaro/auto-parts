import * as fs from 'fs'
import { IAutomakerRepository } from 'modules/Automaker/repositories/IAutomakerRepository'
import { ImportCarResult } from 'modules/Car/dtos/Car.dto'
import { ICarRepository } from 'modules/Car/repositories/ICarRepository'
import * as path from 'path'
import { Car } from 'shared/infra/typeorm/entities/Car'
import { inject, injectable } from 'tsyringe'
import { readCsv } from 'utils/CsvReader/CsvReader'
import { readExcel } from 'utils/ExcelReader/ExcelReader'
import AppError from '../../../../http/error/AppError'

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

                console.log('rawExcelData', rawExcelData)

                carsData = rawExcelData.slice(1).map(row => ({
                    descricao: row[0]?.trim(),
                    marca: row[1]?.trim(),
                }))

                console.log('carsData', carsData)
            }

            fs.unlinkSync(file.path)

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
            }
        } catch (error: any) {
            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path)
            }
            throw new AppError(error.message)
        }
    }
}
