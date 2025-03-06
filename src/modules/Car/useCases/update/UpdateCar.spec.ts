import { DataSource } from 'typeorm'
import AppError from '../../../../http/error/AppError'
import { createTestDatabase } from '../../../../shared/infra/typeorm/database/DataBaseTestes'
import { Car } from '../../../../shared/infra/typeorm/entities/Car'
import { AutomakerRepository } from '../../../Automaker/repositories/implementations/AutomakerRepository'
import { CarRepository } from '../../repositories/implementations/CarRepository'
import { UpdateCarService } from './UpdateCar.service'

describe('Update Car Service', () => {
    let dataSource: DataSource
    let carRepository: CarRepository
    let automakerRepository: AutomakerRepository
    let updateCarService: UpdateCarService

    beforeAll(async () => {
        dataSource = await createTestDatabase()
        require('../../../../shared/infra/typeorm/database/dataSource').dataBaseConnection =
            dataSource
        automakerRepository = new AutomakerRepository()
        carRepository = new CarRepository()
        updateCarService = new UpdateCarService(carRepository, automakerRepository)
    })

    afterAll(async () => {
        await dataSource.destroy()
    })

    beforeEach(async () => {
        await dataSource.getRepository(Car).clear()
    })

    it('should update a car successfully', async () => {
        const automaker = await automakerRepository.create({ description: 'Test Automaker' })
        const car = await carRepository.create({
            automakerId: automaker.id,
            description: 'Model X',
        })

        const updatedData = {
            id: car.id,
            automakerId: automaker.id,
            description: 'Model Y',
        }

        const updatedCar = await updateCarService.execute(updatedData)

        expect(updatedCar).toHaveProperty('id')
        expect(updatedCar.description).toBe('Model Y')
        expect(updatedCar.updatedAt).not.toBe(car.updatedAt)
    })

    it('should throw an error if car does not exist', async () => {
        const updatedData = { id: 999, automakerId: 1, description: 'Model Y' }

        await expect(updateCarService.execute(updatedData)).rejects.toEqual(
            new AppError('Veículo não encontrado.', 404)
        )
    })

    it('should throw an error if automaker does not exist', async () => {
        const automaker = await automakerRepository.create({ description: 'Test Automaker' })
        const car = await carRepository.create({
            automakerId: automaker.id,
            description: 'Model X',
        })

        const updatedData = {
            id: car.id,
            automakerId: 999,
            description: 'Model Z',
        }

        await expect(updateCarService.execute(updatedData)).rejects.toEqual(
            new AppError('Montadora não encontrada.', 404)
        )
    })
})
