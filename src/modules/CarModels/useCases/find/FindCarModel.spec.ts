import { DataSource } from 'typeorm'
import { createTestDatabase } from '../../../../shared/infra/typeorm/database/DataBaseTestes'
import { CarModel } from '../../../../shared/infra/typeorm/entities/CarModel'
import { AutomakerRepository } from '../../../Automaker/repositories/implementations/AutomakerRepository'
import { CarRepository } from '../../../Car/repositories/implementations/CarRepository'
import { CarModelsRepository } from '../../repositories/implementations/CarModelsRepository'
import { FindCarModelService } from './FindCarModel.service'

describe('Find Car Model Service', () => {
    let dataSource: DataSource
    let carModelRepository: CarModelsRepository
    let carRepository: CarRepository
    let automakerRepository: AutomakerRepository
    let findCarModelService: FindCarModelService

    beforeAll(async () => {
        dataSource = await createTestDatabase()
        require('../../../../shared/infra/typeorm/database/dataSource').dataBaseConnection =
            dataSource
        carModelRepository = new CarModelsRepository()
        carRepository = new CarRepository()
        automakerRepository = new AutomakerRepository()
        findCarModelService = new FindCarModelService(carModelRepository)
    })

    afterAll(async () => {
        await dataSource.destroy()
    })

    beforeEach(async () => {
        await dataSource.getRepository(CarModel).clear()
    })

    it('should find a car model by ID', async () => {
        const automaker = await automakerRepository.create({ description: 'Test Automaker' })
        const car = await carRepository.create({
            description: 'Test Car',
            automakerId: automaker.id,
        })
        const carModel = await carModelRepository.create({ carId: car.id, description: 'Model X' })

        const result = await findCarModelService.execute(carModel.id)

        expect(result).toHaveLength(1)
        expect(result[0].id).toBe(carModel.id)
    })

    it('should find car models by description', async () => {
        await carModelRepository.create({ carId: 1, description: 'Model X' })
        const result = await findCarModelService.execute(undefined, 'Model X')

        expect(result).toHaveLength(1)
        expect(result[0].description).toBe('Model X')
    })

    it('should find car models by car ID', async () => {
        const automaker = await automakerRepository.create({ description: 'Test Automaker' })
        const car = await carRepository.create({
            description: 'Test Car',
            automakerId: automaker.id,
        })
        await carModelRepository.create({ carId: car.id, description: 'Model X' })
        const result = await findCarModelService.execute(undefined, undefined, car.id)

        expect(result).toHaveLength(1)
        expect(result[0].carId).toBe(car.id)
    })

    it('should return all car models if no filter is provided', async () => {
        await carModelRepository.create({ carId: 1, description: 'Model A' })
        await carModelRepository.create({ carId: 2, description: 'Model B' })
        const result = await findCarModelService.execute()

        expect(result.length).toBeGreaterThanOrEqual(2)
    })
})
