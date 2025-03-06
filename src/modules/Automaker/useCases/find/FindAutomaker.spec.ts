import { DataSource } from 'typeorm'
import AppError from '../../../../http/error/AppError'
import { createTestDatabase } from '../../../../shared/infra/typeorm/database/DataBaseTestes'
import { Automaker } from '../../../../shared/infra/typeorm/entities/Automaker'
import { AutomakerRepository } from '../../repositories/implementations/AutomakerRepository'
import { GetAutomakerService } from './FindAutomaker.service'

describe('Get Automaker Service', () => {
    let dataSource: DataSource
    let automakerRepository: AutomakerRepository
    let getAutomakerService: GetAutomakerService

    beforeAll(async () => {
        dataSource = await createTestDatabase()
        require('../../../../shared/infra/typeorm/database/dataSource').dataBaseConnection =
            dataSource
        automakerRepository = new AutomakerRepository()
        getAutomakerService = new GetAutomakerService(automakerRepository)
    })

    afterAll(async () => {
        await dataSource.destroy()
    })

    beforeEach(async () => {
        await dataSource.getRepository(Automaker).clear()
    })

    it('should find an automaker by id successfully', async () => {
        const automaker = await automakerRepository.create({ description: 'Test Automaker' })

        const result = await getAutomakerService.execute(automaker.id)

        expect(result).toHaveLength(1)
        expect(result[0].id).toBe(automaker.id)
        expect(result[0].description).toBe(automaker.description)
    })

    it('should find an automaker by description successfully', async () => {
        const automaker = await automakerRepository.create({ description: 'Test Automaker' })

        const result = await getAutomakerService.execute(undefined, automaker.description)

        expect(result).toHaveLength(1)
        expect(result[0].description).toBe(automaker.description)
    })

    it('should find all automakers when no search criteria are provided', async () => {
        const automaker1 = await automakerRepository.create({ description: 'Automaker One' })
        const automaker2 = await automakerRepository.create({ description: 'Automaker Two' })

        const result = await getAutomakerService.execute()

        expect(result).toHaveLength(2)
        expect(result[0].description).toBe(automaker1.description)
        expect(result[1].description).toBe(automaker2.description)
    })

    it('should throw an error if no automaker is found for the provided id or description', async () => {
        const nonExistentId = 999
        const nonExistentDescription = 'Non-existent Automaker'

        await expect(getAutomakerService.execute(nonExistentId)).rejects.toEqual(
            new AppError('Nenhuma montadora encontrada para os critérios fornecidos.', 404)
        )

        await expect(
            getAutomakerService.execute(undefined, nonExistentDescription)
        ).rejects.toEqual(
            new AppError('Nenhuma montadora encontrada para os critérios fornecidos.', 404)
        )
    })
})
