import { DataSource } from 'typeorm'
import { createTestDatabase } from '../../../../shared/infra/typeorm/database/DataBaseTestes'
import { Car } from '../../../../shared/infra/typeorm/entities/Car'
import { AutomakerRepository } from '../../../Automaker/repositories/implementations/AutomakerRepository'
import { CarRepository } from '../../repositories/implementations/CarRepository'
import { GetCarService } from './FindCar.service'

describe('Get Car Service', () => {
    let dataSource: DataSource
    let carRepository: CarRepository
    let automakerRepository: AutomakerRepository
    let getCarService: GetCarService

    beforeAll(async () => {
        dataSource = await createTestDatabase()
        require('../../../../shared/infra/typeorm/database/dataSource').dataBaseConnection =
            dataSource
        automakerRepository = new AutomakerRepository()
        carRepository = new CarRepository()
        getCarService = new GetCarService(carRepository)
    })

    afterAll(async () => {
        await dataSource.destroy()
    })

    beforeEach(async () => {
        await dataSource.getRepository(Car).clear()
    })

    it('should return a car when searching by ID', async () => {
        const automaker = await automakerRepository.create({ description: 'Test Automaker' })
        const car = await carRepository.create({
            automakerId: automaker.id,
            description: 'Model X',
        })

        const result = await getCarService.execute(car.id)

        expect(result).toHaveLength(1)
        expect(result[0].id).toBe(car.id)
        expect(result[0].description).toBe('Model X')
    })

    it('should return a car when searching by description and automakerId', async () => {
        const automaker = await automakerRepository.create({ description: 'Test Automaker' })
        await carRepository.create({ automakerId: automaker.id, description: 'Model Y' })

        const result = await getCarService.execute(undefined, 'Model Y', automaker.id)

        expect(result).toHaveLength(1)
        expect(result[0].description).toBe('Model Y')
        expect(result[0].automakerId).toBe(automaker.id)
    })

    it('should return a car when searching by description only', async () => {
        const automaker = await automakerRepository.create({ description: 'Test Automaker' })
        await carRepository.create({ automakerId: automaker.id, description: 'Model Z' })

        const result = await getCarService.execute(undefined, 'Model Z')

        expect(result).toHaveLength(1)
        expect(result[0].description).toBe('Model Z')
    })

    it('should return all cars when no filter is provided', async () => {
        const automaker = await automakerRepository.create({ description: 'Test Automaker' })
        await carRepository.create({ automakerId: automaker.id, description: 'Model A' })
        await carRepository.create({ automakerId: automaker.id, description: 'Model B' })

        const result = await getCarService.execute()

        expect(result).toHaveLength(2)
    })
})
