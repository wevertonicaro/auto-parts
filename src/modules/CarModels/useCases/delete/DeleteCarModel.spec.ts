import { DataSource } from 'typeorm'
import { createTestDatabase } from '../../../../shared/infra/typeorm/database/DataBaseTestes'
import { CarModel } from '../../../../shared/infra/typeorm/entities/CarModel'
import { AutomakerRepository } from '../../../Automaker/repositories/implementations/AutomakerRepository'
import { CarRepository } from '../../../Car/repositories/implementations/CarRepository'
import { CarModelsRepository } from '../../repositories/implementations/CarModelsRepository'
import { DeleteCarModelService } from './DeleteCarModel.service'

describe('Delete Car Model Service', () => {
    let dataSource: DataSource
    let carModelRepository: CarModelsRepository
    let automakerRepository: AutomakerRepository
    let carRepository: CarRepository
    let deleteCarModelService: DeleteCarModelService

    beforeAll(async () => {
        dataSource = await createTestDatabase()
        require('../../../../shared/infra/typeorm/database/dataSource').dataBaseConnection =
            dataSource
        carModelRepository = new CarModelsRepository()
        carRepository = new CarRepository()
        automakerRepository = new AutomakerRepository()
        deleteCarModelService = new DeleteCarModelService(carModelRepository)
    })

    afterAll(async () => {
        await dataSource.destroy()
    })

    beforeEach(async () => {
        await dataSource.getRepository(CarModel).clear()
    })

    it('should delete a car model successfully', async () => {
        const automaker = await automakerRepository.create({ description: 'Test Automaker' })
        const car = await carRepository.create({
            description: 'Test Car',
            automakerId: automaker.id,
        })
        const data = { carId: Number(car.id), description: 'Model X' }
        const carModel = await carModelRepository.create(data)

        const result = await deleteCarModelService.execute(carModel.id)

        expect(result).toBe(true)
    })

    it('should return an error message if car model does not exist', async () => {
        const result = await deleteCarModelService.execute(9999)

        expect(result).toBe('Modelo de veículo não encontrado.')
    })
})
