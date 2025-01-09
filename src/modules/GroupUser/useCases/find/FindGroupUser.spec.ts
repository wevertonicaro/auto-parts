import { DataSource } from 'typeorm'
import AppError from '../../../../http/error/AppError'
import { createTestDatabase } from '../../../../shared/infra/typeorm/database/DataBaseTestes'
import { GroupUser } from '../../../../shared/infra/typeorm/entities/GroupUsers'
import { GroupUserRepository } from '../../repositories/implementations/GroupUserRepository'
import { CreateGroupUserService } from '../create/CreateGroupUser.service'
import { GetGroupUserService } from './FindGroupUser.service'

describe('Get group user', () => {
    let dataSource: DataSource
    let groupUserRepository: GroupUserRepository
    let createGroupUserService: CreateGroupUserService
    let getGroupUserService: GetGroupUserService

    beforeAll(async () => {
        dataSource = await createTestDatabase()
        require('../../../../shared/infra/typeorm/database/dataSource').dataBaseConnection =
            dataSource
        groupUserRepository = new GroupUserRepository()
        createGroupUserService = new CreateGroupUserService(groupUserRepository)
        getGroupUserService = new GetGroupUserService(groupUserRepository)
    })

    afterAll(async () => {
        await dataSource.destroy()
    })

    beforeEach(async () => {
        await dataSource.getRepository(GroupUser).clear()
    })

    it('Should fetch group user by ID', async () => {
        const groupData = { description: 'Teste' }

        const group = await createGroupUserService.execute(groupData)

        const result = await getGroupUserService.execute(group.id)

        expect(result).toHaveLength(1)
        expect(result[0].id).toBe(group.id)
    })

    it('Should fetch group user by description', async () => {
        const groupData = { description: 'Teste' }

        await createGroupUserService.execute(groupData)

        const result = await getGroupUserService.execute(undefined, 'Teste')

        expect(result).toHaveLength(1)
        expect(result[0].description).toBe('Teste')
    })

    it('Should fetch all group users when no filters are provided', async () => {
        const groupData1 = { description: 'Grupo 1' }
        const groupData2 = { description: 'Grupo 2' }

        await createGroupUserService.execute(groupData1)

        await createGroupUserService.execute(groupData2)

        const result = await getGroupUserService.execute()

        expect(result).toHaveLength(2)
        expect(result.map(group => group.description)).toEqual(
            expect.arrayContaining(['Grupo 1', 'Grupo 2'])
        )
    })

    it('Should return an empty array if no group users found', async () => {
        await expect(getGroupUserService.execute()).rejects.toBeInstanceOf(AppError)
        await expect(getGroupUserService.execute()).rejects.toMatchObject({
            message: 'Nenhum grupo encontrado.',
            statusCode: 404,
        })
    })

    it('Should throw an error if the group user does not exist by ID', async () => {
        await expect(getGroupUserService.execute(999)).rejects.toBeInstanceOf(AppError)
        await expect(getGroupUserService.execute(999)).rejects.toMatchObject({
            message: 'Grupo não encontrado.',
            statusCode: 404,
        })
    })

    it('Should throw an error if the group user does not exist by description', async () => {
        await expect(getGroupUserService.execute(undefined, 'Nonexistent')).rejects.toBeInstanceOf(
            AppError
        )
        await expect(getGroupUserService.execute(undefined, 'Nonexistent')).rejects.toMatchObject({
            message: 'Grupo não encontrado.',
            statusCode: 404,
        })
    })
})
