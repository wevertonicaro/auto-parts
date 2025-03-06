import { DataSource } from 'typeorm'
import AppError from '../../../../http/error/AppError'
import { createTestDatabase } from '../../../../shared/infra/typeorm/database/DataBaseTestes'
import { Automaker } from '../../../../shared/infra/typeorm/entities/Automaker'
import { AutomakerRepository } from '../../repositories/implementations/AutomakerRepository'
import { DeleteAutomakerService } from './DeleteAutomaker.service'

describe('Delete Automaker Service', () => {
    let dataSource: DataSource
    let automakerRepository: AutomakerRepository
    let deleteAutomakerService: DeleteAutomakerService

    beforeAll(async () => {
        dataSource = await createTestDatabase()
        require('../../../../shared/infra/typeorm/database/dataSource').dataBaseConnection =
            dataSource
        automakerRepository = new AutomakerRepository()
        deleteAutomakerService = new DeleteAutomakerService(automakerRepository)
    })

    afterAll(async () => {
        await dataSource.destroy()
    })

    beforeEach(async () => {
        await dataSource.getRepository(Automaker).clear()
    })

    it('should delete an automaker successfully', async () => {
        const automaker = await automakerRepository.create({ description: 'Test Automaker' })

        const result = await deleteAutomakerService.execute(automaker.id)

        expect(result).toBe(true)

        const deletedAutomaker = await automakerRepository.findById(automaker.id)
        expect(deletedAutomaker).toBeNull()
    })

    it('should throw an error if automaker is not found', async () => {
        const nonExistentId = 999

        await expect(deleteAutomakerService.execute(nonExistentId)).rejects.toEqual(
            new AppError('Montadora não encontrada', 404)
        )
    })
})
