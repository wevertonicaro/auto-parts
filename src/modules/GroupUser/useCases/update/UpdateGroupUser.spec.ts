import { DataSource } from 'typeorm'
import AppError from '../../../../http/error/AppError'
import { createTestDatabase } from '../../../../shared/infra/typeorm/database/DataBaseTestes'
import { GroupUser } from '../../../../shared/infra/typeorm/entities/GroupUsers'
import { GroupUserRepository } from '../../repositories/implementations/GroupUserRepository'
import { CreateGroupUserService } from '../create/CreateGroupUser.service'
import { UpdateGroupUserService } from './UpdateGroupUser.service'

describe('Update Group User', () => {
    let dataSource: DataSource
    let groupUserRepository: GroupUserRepository
    let createGroupUserService: CreateGroupUserService
    let updateGroupUserService: UpdateGroupUserService

    beforeAll(async () => {
        dataSource = await createTestDatabase()
        require('../../../../shared/infra/typeorm/database/dataSource').dataBaseConnection =
            dataSource
        groupUserRepository = new GroupUserRepository()
        createGroupUserService = new CreateGroupUserService(groupUserRepository)
        updateGroupUserService = new UpdateGroupUserService(groupUserRepository)
    })

    afterAll(async () => {
        await dataSource.destroy()
    })

    beforeEach(async () => {
        await dataSource.getRepository(GroupUser).clear()
    })

    it('Should be update a group user', async () => {
        const groupData = { description: 'Old Description' }
        const createdGroup = await createGroupUserService.execute(groupData)

        const updatedGroup = await updateGroupUserService.execute({
            id: createdGroup.id,
            description: 'Updated Description',
        })

        expect(updatedGroup.id).toEqual(createdGroup.id)
        expect(updatedGroup.description).not.toEqual(createdGroup.description)
    })

    it('Should throw an error if the group user does not exist by ID', async () => {
        const updateData = {
            id: 999,
            description: 'Updated Description',
        }

        await expect(updateGroupUserService.execute(updateData)).rejects.toBeInstanceOf(AppError)
        await expect(updateGroupUserService.execute(updateData)).rejects.toMatchObject({
            message: 'Grupo não encontrado.',
            statusCode: 404,
        })
    })
})
