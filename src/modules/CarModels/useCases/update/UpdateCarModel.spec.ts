import { DataSource } from 'typeorm'
import AppError from '../../../../http/error/AppError'
import { createTestDatabase } from '../../../../shared/infra/typeorm/database/DataBaseTestes'
import { CarModel } from '../../../../shared/infra/typeorm/entities/CarModel'
import { AutomakerRepository } from '../../../Automaker/repositories/implementations/AutomakerRepository'
import { CarRepository } from '../../../Car/repositories/implementations/CarRepository'
import { CarModelsRepository } from '../../repositories/implementations/CarModelsRepository'
import { UpdateCarModelService } from './UpdateCarModel.service'

describe('Update Car Model Service', () => {
    let dataSource: DataSource
    let carModelRepository: CarModelsRepository
    let automakerRepository: AutomakerRepository
    let carRepository: CarRepository
    let updateCarModelService: UpdateCarModelService

    beforeAll(async () => {
        dataSource = await createTestDatabase()
        require('../../../../shared/infra/typeorm/database/dataSource').dataBaseConnection =
            dataSource
        carModelRepository = new CarModelsRepository()
        carRepository = new CarRepository()
        automakerRepository = new AutomakerRepository()
        updateCarModelService = new UpdateCarModelService(carModelRepository, carRepository)
    })

    afterAll(async () => {
        await dataSource.destroy()
    })

    beforeEach(async () => {
        await dataSource.getRepository(CarModel).clear()
    })

    it('should update a car model successfully', async () => {
        const automaker = await automakerRepository.create({ description: 'Test Automaker' })
        const car = await carRepository.create({
            description: 'Test Car',
            automakerId: automaker.id,
        })
        const carModel = await carModelRepository.create({
            carId: car.id,
            description: 'Old Model',
        })

        const data = { id: carModel.id, carId: car.id, description: 'Updated Model' }
        const result = await updateCarModelService.execute(data)

        expect(result).toHaveProperty('id')
        expect(result.description).toBe(data.description)
    })

    it('should throw an error if car model does not exist', async () => {
        const data = { id: 9999, carId: 1, description: 'Model X' }

        await expect(updateCarModelService.execute(data)).rejects.toEqual(
            new AppError('Modelo de véiculo não encontrada.', 404)
        )
    })

    it('should throw an error if car does not exist', async () => {
        const automaker = await automakerRepository.create({ description: 'Test Automaker' })
        const car = await carRepository.create({
            description: 'Test Car',
            automakerId: automaker.id,
        })
        const carModel = await carModelRepository.create({
            carId: car.id,
            description: 'Old Model',
        })

        const data = { id: carModel.id, carId: 9999, description: 'Updated Model' }

        await expect(updateCarModelService.execute(data)).rejects.toEqual(
            new AppError('Veículo não encontrado.', 404)
        )
    })
})
