import { DataSource } from 'typeorm'
import AppError from '../../../../http/error/AppError'
import { createTestDatabase } from '../../../../shared/infra/typeorm/database/DataBaseTestes'
import { Automaker } from '../../../../shared/infra/typeorm/entities/Automaker'
import { AutomakerRepository } from '../../repositories/implementations/AutomakerRepository'
import { UpdateAutomakerService } from './UpdateAutomaker.service'

describe('Update Automaker Service', () => {
    let dataSource: DataSource
    let automakerRepository: AutomakerRepository
    let updateAutomakerService: UpdateAutomakerService

    beforeAll(async () => {
        dataSource = await createTestDatabase()
        require('../../../../shared/infra/typeorm/database/dataSource').dataBaseConnection =
            dataSource
        automakerRepository = new AutomakerRepository()
        updateAutomakerService = new UpdateAutomakerService(automakerRepository)
    })

    afterAll(async () => {
        await dataSource.destroy()
    })

    beforeEach(async () => {
        await dataSource.getRepository(Automaker).clear()
    })

    it('should update an automaker successfully', async () => {
        const automaker = await automakerRepository.create({ description: 'Test Automaker' })
        const updatedData = { id: automaker.id, description: 'Updated Automaker' }

        const updatedAutomaker = await updateAutomakerService.execute(updatedData)

        expect(updatedAutomaker).toHaveProperty('id', automaker.id)
        expect(updatedAutomaker.description).toBe(updatedData.description)
    })

    it('should throw an error if automaker is not found', async () => {
        const nonExistentId = 999
        const updatedData = { id: nonExistentId, description: 'Updated Automaker' }

        await expect(updateAutomakerService.execute(updatedData)).rejects.toEqual(
            new AppError('Montadora não encontrada.', 404)
        )
    })
})
