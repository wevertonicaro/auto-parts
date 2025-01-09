import { faker } from '@faker-js/faker/.'
import { DataSource } from 'typeorm'
import AppError from '../../../../http/error/AppError'
import { createTestDatabase } from '../../../../shared/infra/typeorm/database/DataBaseTestes'
import { GroupUserRepository } from '../../../GroupUser/repositories/implementations/GroupUserRepository'
import { CreateGroupUserService } from '../../../GroupUser/useCases/create/CreateGroupUser.service'
import { UserRepository } from '../../repositories/implementations/UserRepository'
import { CreateUserService } from '../create/CreateUser.service'
import { DeleteUserService } from './DeleteUser.service'

describe('Delete User', () => {
    let dataSource: DataSource
    let groupUserRepository: GroupUserRepository
    let createGroupUserService: CreateGroupUserService
    let userRepository: UserRepository
    let createUserService: CreateUserService
    let deleteUserService: DeleteUserService

    beforeAll(async () => {
        dataSource = await createTestDatabase()
        require('../../../../shared/infra/typeorm/database/dataSource').dataBaseConnection =
            dataSource

        groupUserRepository = new GroupUserRepository()
        userRepository = new UserRepository()
        createGroupUserService = new CreateGroupUserService(groupUserRepository)
        createUserService = new CreateUserService(userRepository, groupUserRepository)
        deleteUserService = new DeleteUserService(userRepository)
    })

    afterAll(async () => {
        await dataSource.destroy()
    })

    beforeEach(async () => {
        await dataSource.synchronize(true)
    })

    // Helper para criar grupos
    const createTestGroup = async (description: string) => {
        const uniqueDescription = `${description}-${Date.now()}`
        return createGroupUserService.execute({ description: uniqueDescription })
    }

    // Helper para criar usuários
    const createTestUser = async (overrides = {}) => {
        const group = await createTestGroup('Teste')
        const defaultUserData = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 8 }),
            phone: faker.phone.number(),
            groupUserId: group.id,
        }
        return createUserService.execute({ ...defaultUserData, ...overrides })
    }

    it('Should delete a user successfully', async () => {
        const user = await createTestUser()

        const result = await deleteUserService.execute(user.id, user)

        expect(result).toBe(true)

        const userAfterDeletion = await userRepository.findById(user.id)
        expect(userAfterDeletion).toBeNull()
    })

    it('Should not delete a user without permission', async () => {
        const adminGroup = await createTestGroup('Admin Group')
        const userGroup = await createTestGroup('User Group')

        const user1 = await createTestUser({ groupUserId: userGroup.id })
        const user2 = await createTestUser({
            email: 'test2@example.com',
            groupUserId: adminGroup.id,
        })

        await expect(deleteUserService.execute(user2.id, user1)).rejects.toMatchObject({
            message: 'Usuário não tem permissão para essa ação',
            statusCode: 401,
        })
    })

    it('Should not delete a non-existing user', async () => {
        const user = await createTestUser()

        await expect(deleteUserService.execute(9999, user)).rejects.toEqual(
            new AppError('Usuário não encontrado.', 404)
        )
    })
})
