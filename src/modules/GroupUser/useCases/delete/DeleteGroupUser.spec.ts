import { DataSource } from 'typeorm'
import AppError from '../../../../http/error/AppError'
import { createTestDatabase } from '../../../../shared/infra/typeorm/database/DataBaseTestes'
import { GroupUser } from '../../../../shared/infra/typeorm/entities/GroupUsers'
import { GroupUserRepository } from '../../repositories/implementations/GroupUserRepository'
import { CreateGroupUserService } from '../create/CreateGroupUser.service'
import { DeleteGroupUserService } from './DeleteGroupUser.service'

describe('Delete group user', () => {
    let dataSource: DataSource
    let groupUserRepository: GroupUserRepository
    let createGroupUserService: CreateGroupUserService
    let deleteGroupUserService: DeleteGroupUserService

    beforeAll(async () => {
        dataSource = await createTestDatabase()
        require('../../../../shared/infra/typeorm/database/dataSource').dataBaseConnection =
            dataSource
        groupUserRepository = new GroupUserRepository()
        createGroupUserService = new CreateGroupUserService(groupUserRepository)
        deleteGroupUserService = new DeleteGroupUserService(groupUserRepository)
    })

    afterAll(async () => {
        await dataSource.destroy()
    })

    beforeEach(async () => {
        await dataSource.getRepository(GroupUser).clear()
    })

    it('Should be able delete group user', async () => {
        const groupData = { description: 'Teste' }

        const group = await createGroupUserService.execute(groupData)

        const deleteGroupUser = await deleteGroupUserService.execute(group.id)

        expect(deleteGroupUser).toBe(true)
    })

    it('Should throw an error if the group user does not exist', async () => {
        const nonExistentGroupId = 999

        await expect(deleteGroupUserService.execute(nonExistentGroupId)).rejects.toBeInstanceOf(
            AppError
        )
        await expect(deleteGroupUserService.execute(nonExistentGroupId)).rejects.toMatchObject({
            message: 'Grupo não encontrado.',
            statusCode: 404,
        })
    })

    it('Should return false if the deletion fails', async () => {
        const groupData = { description: 'Teste' }

        const group = await createGroupUserService.execute(groupData)

        jest.spyOn(groupUserRepository, 'delete').mockResolvedValueOnce(false)

        const deleteGroupUser = await deleteGroupUserService.execute(group.id)

        expect(deleteGroupUser).toBe(false)
    })
})
