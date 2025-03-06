import { DataSource } from 'typeorm'
import AppError from '../../../../http/error/AppError'
import { createTestDatabase } from '../../../../shared/infra/typeorm/database/DataBaseTestes'
import { Automaker } from '../../../../shared/infra/typeorm/entities/Automaker'
import { AutomakerRepository } from '../../repositories/implementations/AutomakerRepository'
import { CreateAutomakerService } from './CreateAutomaker.service'

describe('Create Automaker Service', () => {
    let dataSource: DataSource
    let automakerRepository: AutomakerRepository
    let createAutomakerService: CreateAutomakerService

    beforeAll(async () => {
        dataSource = await createTestDatabase()
        require('../../../../shared/infra/typeorm/database/dataSource').dataBaseConnection =
            dataSource
        automakerRepository = new AutomakerRepository()
        createAutomakerService = new CreateAutomakerService(automakerRepository)
    })

    afterAll(async () => {
        await dataSource.destroy()
    })

    beforeEach(async () => {
        await dataSource.getRepository(Automaker).clear()
    })

    it('should create an automaker successfully', async () => {
        const data = { description: 'Test Automaker' }

        const result = await createAutomakerService.execute(data)

        expect(result).toHaveProperty('id')
        expect(result.description).toBe(data.description)
    })

    it('should throw an error if automaker already exists', async () => {
        const data = { description: 'Test Automaker' }

        await automakerRepository.create(data)

        await expect(createAutomakerService.execute(data)).rejects.toEqual(
            new AppError('Montadora já existente.')
        )
    })
})
