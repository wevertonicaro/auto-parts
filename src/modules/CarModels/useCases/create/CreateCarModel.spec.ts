import { DataSource } from 'typeorm'
import AppError from '../../../../http/error/AppError'
import { createTestDatabase } from '../../../../shared/infra/typeorm/database/DataBaseTestes'
import { CarModel } from '../../../../shared/infra/typeorm/entities/CarModel'
import { AutomakerRepository } from '../../../Automaker/repositories/implementations/AutomakerRepository'
import { CarRepository } from '../../../Car/repositories/implementations/CarRepository'
import { CarModelsRepository } from '../../repositories/implementations/CarModelsRepository'
import { CreateCarModelService } from './CreateCarModel.service'

describe('Create Car Model Service', () => {
    let dataSource: DataSource
    let carModelRepository: CarModelsRepository
    let carRepository: CarRepository
    let createCarModelService: CreateCarModelService
    let automakerRepository: AutomakerRepository

    beforeAll(async () => {
        dataSource = await createTestDatabase()
        require('../../../../shared/infra/typeorm/database/dataSource').dataBaseConnection =
            dataSource
        carModelRepository = new CarModelsRepository()
        carRepository = new CarRepository()
        automakerRepository = new AutomakerRepository()
        createCarModelService = new CreateCarModelService(carModelRepository, carRepository)
    })

    afterAll(async () => {
        await dataSource.destroy()
    })

    beforeEach(async () => {
        await dataSource.getRepository(CarModel).clear()
    })

    it('should create a car model successfully', async () => {
        const automaker = await automakerRepository.create({ description: 'Test Automaker' })
        const car = await carRepository.create({
            description: 'Test Car',
            automakerId: automaker.id,
        })
        const data = { carId: Number(car.id), description: 'Model X' }

        const result = await createCarModelService.execute(data)

        expect(result).toHaveProperty('id')
        expect(result.description).toBe(data.description)
    })

    it('should throw an error if car does not exist', async () => {
        const data = { carId: 10, description: 'Model Y' }

        await expect(createCarModelService.execute(data)).rejects.toEqual(
            new AppError('Carro não encontrado.')
        )
    })

    it('should throw an error if car model already exists', async () => {
        const automaker = await automakerRepository.create({ description: 'Test Automaker' })
        const car = await carRepository.create({
            description: 'Test Car',
            automakerId: automaker.id,
        })
        const data = { carId: car.id, description: 'Model X' }

        await carModelRepository.create(data)

        await expect(createCarModelService.execute(data)).rejects.toEqual(
            new AppError('Modelo já existente.')
        )
    })
})
