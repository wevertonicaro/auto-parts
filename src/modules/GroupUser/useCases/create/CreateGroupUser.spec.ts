import { DataSource } from 'typeorm'
import AppError from '../../../../http/error/AppError'
import { createTestDatabase } from '../../../../shared/infra/typeorm/database/DataBaseTestes'
import { GroupUser } from '../../../../shared/infra/typeorm/entities/GroupUsers'
import { GroupUserRepository } from '../../repositories/implementations/GroupUserRepository'
import { CreateGroupUserService } from './CreateGroupUser.service'

describe('Create Group User Service', () => {
    let dataSource: DataSource
    let groupUserRepository: GroupUserRepository
    let createGroupUserService: CreateGroupUserService

    beforeAll(async () => {
        dataSource = await createTestDatabase()
        require('../../../../shared/infra/typeorm/database/dataSource').dataBaseConnection =
            dataSource
        groupUserRepository = new GroupUserRepository()
        createGroupUserService = new CreateGroupUserService(groupUserRepository)
    })

    afterAll(async () => {
        await dataSource.destroy()
    })

    beforeEach(async () => {
        await dataSource.getRepository(GroupUser).clear()
    })

    it('Should be able to create a new group user', async () => {
        const groupData = { description: 'Teste' }

        const group = await createGroupUserService.execute(groupData)

        expect(group).toHaveProperty('id')
        expect(group.description).toBe(groupData.description)
    })

    it('Should not be able to create an existing group user', async () => {
        const groupData = { description: 'Teste' }

        // Criar o grupo para simular existência
        await groupUserRepository.create(groupData)

        await expect(createGroupUserService.execute(groupData)).rejects.toEqual(
            new AppError('Grupo já existente.')
        )
    })
})
