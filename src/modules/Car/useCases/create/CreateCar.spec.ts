import { DataSource } from 'typeorm'
import AppError from '../../../../http/error/AppError'
import { createTestDatabase } from '../../../../shared/infra/typeorm/database/DataBaseTestes'
import { Car } from '../../../../shared/infra/typeorm/entities/Car'
import { AutomakerRepository } from '../../../Automaker/repositories/implementations/AutomakerRepository'
import { CarRepository } from '../../repositories/implementations/CarRepository'
import { CreateCarService } from './CreateCar.service'

describe('Create Car Service', () => {
    let dataSource: DataSource
    let carRepository: CarRepository
    let automakerRepository: AutomakerRepository
    let createCarService: CreateCarService

    beforeAll(async () => {
        dataSource = await createTestDatabase()
        require('../../../../shared/infra/typeorm/database/dataSource').dataBaseConnection =
            dataSource
        automakerRepository = new AutomakerRepository()
        carRepository = new CarRepository()
        createCarService = new CreateCarService(carRepository, automakerRepository)
    })

    afterAll(async () => {
        await dataSource.destroy()
    })

    beforeEach(async () => {
        await dataSource.getRepository(Car).clear()
    })

    it('should create a car successfully', async () => {
        const automaker = await automakerRepository.create({ description: 'Test Automaker' })
        const data = { automakerId: Number(automaker.id), description: 'Model X' }

        const result = await createCarService.execute(data)

        expect(result).toHaveProperty('id')
        expect(result.description).toBe(data.description)
    })

    it('should throw an error if automaker does not exist', async () => {
        const data = { automakerId: 999, description: 'Model Y' }

        await expect(createCarService.execute(data)).rejects.toEqual(
            new AppError('Montadora não encontrada.', 404)
        )
    })

    it('should throw an error if car already exists', async () => {
        const automaker = await automakerRepository.create({ description: 'Test Automaker' })
        await carRepository.create({
            description: 'Test Car',
            automakerId: automaker.id,
        })

        const data = { automakerId: automaker.id, description: 'Test Car' }

        await expect(createCarService.execute(data)).rejects.toEqual(
            new AppError('Veículo já existente.')
        )
    })
})
