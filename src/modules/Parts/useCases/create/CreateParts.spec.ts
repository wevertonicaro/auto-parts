import { DataSource } from 'typeorm'
import AppError from '../../../../http/error/AppError'
import { createTestDatabase } from '../../../../shared/infra/typeorm/database/DataBaseTestes'
import { AutomakerRepository } from '../../../Automaker/repositories/implementations/AutomakerRepository'
import { CarRepository } from '../../../Car/repositories/implementations/CarRepository'
import { CarModelsRepository } from '../../../CarModels/repositories/implementations/CarModelsRepository'
import { PartsModelsRelationsRepository } from '../../repositories/implementations/PartsModelsRelationsRepository'
import { PartsRepository } from '../../repositories/implementations/PartsRepository'
import { CreatePartsService } from './CreateParts.service'

describe('Create Parts Service', () => {
    let dataSource: DataSource
    let carRepository: CarRepository
    let automakerRepository: AutomakerRepository
    let partsRepository: PartsRepository
    let carModelRepository: CarModelsRepository
    let partsModelsRelationsRepository: PartsModelsRelationsRepository
    let createPartsService: CreatePartsService

    beforeAll(async () => {
        dataSource = await createTestDatabase()
        require('../../../../shared/infra/typeorm/database/dataSource').dataBaseConnection =
            dataSource

        partsRepository = new PartsRepository()

        carModelRepository = new CarModelsRepository()
        carRepository = new CarRepository()
        automakerRepository = new AutomakerRepository()
        partsModelsRelationsRepository = new PartsModelsRelationsRepository()
        createPartsService = new CreatePartsService(
            partsRepository,
            partsModelsRelationsRepository,
            carModelRepository
        )
    })

    afterAll(async () => {
        await dataSource.destroy()
    })

    beforeEach(async () => {
        await dataSource.synchronize(true)
    })

    it('should create a part successfully', async () => {
        const automaker = await automakerRepository.create({ description: 'Test Automaker' })
        const car = await carRepository.create({
            description: 'Test Car',
            automakerId: Number(automaker.id),
        })
        const carModel = await carModelRepository.create({
            carId: Number(car.id),
            description: 'Test Model',
        })

        const data = {
            code: 'ABC123',
            description: 'Brake Pad',
            carModelId: [Number(carModel.id)],
            price: 150.0,
            quantity: 10,
        }

        const result = await createPartsService.execute(data)

        expect(result).toHaveProperty('id')
        expect(result.description).toBe(data.description)
    })

    it('should throw an error if part already exists', async () => {
        const automaker = await automakerRepository.create({ description: 'Test Automaker' })
        const car = await carRepository.create({
            description: 'Test Car',
            automakerId: automaker.id,
        })

        const carModel = await carModelRepository.create({
            carId: Number(car.id),
            description: 'Test Model',
        })

        const data = {
            code: 'ABC123',
            description: 'Brake Pad',
            carModelId: [Number(carModel.id)],
            price: 150.0,
            quantity: 10,
        }

        await partsRepository.create(data)

        await expect(createPartsService.execute(data)).rejects.toEqual(
            new AppError('Peça já existente.')
        )
    })

    it('should throw an error if car model does not exist', async () => {
        const data = {
            code: 'XYZ789',
            description: 'Air Filter',
            carModelId: [999],
            price: 120.0,
            quantity: 5,
        }

        await expect(createPartsService.execute(data)).rejects.toEqual(
            new AppError('Modelo de veículo não encontrado.')
        )
    })

    it('should throw an error if invalid data is provided', async () => {
        const data = { code: '', description: '', carModelId: [], price: null, quantity: null }

        await expect(createPartsService.execute(data)).rejects.toMatchObject({
            message: expect.arrayContaining([
                expect.objectContaining({ message: expect.stringContaining('obrigatório') }),
            ]),
        })
    })
})
