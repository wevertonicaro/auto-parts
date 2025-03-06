import { DataSource } from 'typeorm'
import AppError from '../../../../http/error/AppError'
import { createTestDatabase } from '../../../../shared/infra/typeorm/database/DataBaseTestes'
import { Car } from '../../../../shared/infra/typeorm/entities/Car'
import { AutomakerRepository } from '../../../Automaker/repositories/implementations/AutomakerRepository'
import { CarRepository } from '../../repositories/implementations/CarRepository'
import { DeleteCarService } from './DeleteCar.service'

describe('Delete Car Service', () => {
    let dataSource: DataSource
    let carRepository: CarRepository
    let automakerRepository: AutomakerRepository
    let deleteCarService: DeleteCarService

    beforeAll(async () => {
        dataSource = await createTestDatabase()
        require('../../../../shared/infra/typeorm/database/dataSource').dataBaseConnection =
            dataSource
        automakerRepository = new AutomakerRepository()
        carRepository = new CarRepository()
        deleteCarService = new DeleteCarService(carRepository)
    })

    afterAll(async () => {
        await dataSource.destroy()
    })

    beforeEach(async () => {
        await dataSource.getRepository(Car).clear()
    })

    it('should delete a car successfully', async () => {
        const automaker = await automakerRepository.create({ description: 'Test Automaker' })
        const car = await carRepository.create({
            automakerId: automaker.id,
            description: 'Model X',
        })

        const result = await deleteCarService.execute(car.id)
        const carAfterDeletion = await carRepository.findById(car.id)

        expect(result).toBeTruthy()
        expect(carAfterDeletion).toBeNull()
    })

    it('should throw an error if car does not exist', async () => {
        await expect(deleteCarService.execute(999)).rejects.toEqual(
            new AppError('Veículo não encontrado', 404)
        )
    })
})
