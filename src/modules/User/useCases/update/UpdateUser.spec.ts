import { faker } from '@faker-js/faker/.'
import { DataSource } from 'typeorm'
import AppError from '../../../../http/error/AppError'
import { createTestDatabase } from '../../../../shared/infra/typeorm/database/DataBaseTestes'
import { GroupUserRepository } from '../../../GroupUser/repositories/implementations/GroupUserRepository'
import { CreateGroupUserService } from '../../../GroupUser/useCases/create/CreateGroupUser.service'
import { UserRepository } from '../../repositories/implementations/UserRepository'
import { CreateUserService } from '../create/CreateUser.service'
import { UpdateUserService } from './UpdateUser.service'

describe('Update User', () => {
    let dataSource: DataSource
    let groupUserRepository: GroupUserRepository
    let createGroupUserService: CreateGroupUserService
    let userRepository: UserRepository
    let createUserService: CreateUserService
    let updateUserService: UpdateUserService

    beforeAll(async () => {
        dataSource = await createTestDatabase()
        require('../../../../shared/infra/typeorm/database/dataSource').dataBaseConnection =
            dataSource

        groupUserRepository = new GroupUserRepository()
        userRepository = new UserRepository()
        createGroupUserService = new CreateGroupUserService(groupUserRepository)
        createUserService = new CreateUserService(userRepository, groupUserRepository)
        updateUserService = new UpdateUserService(userRepository)
    })

    afterAll(async () => {
        await dataSource.destroy()
    })

    beforeEach(async () => {
        await dataSource.synchronize(true)
    })

    const createTestGroup = async (description: string) => {
        const uniqueDescription = `${description}-${Date.now()}`
        return createGroupUserService.execute({ description: uniqueDescription })
    }

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

    it('Should be update a user', async () => {
        const user = await createTestUser()

        const userUpdateData = {
            id: user.id,
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 8 }),
            phone: faker.phone.number(),
        }

        const result = await updateUserService.execute(userUpdateData, user)

        expect(result.id).toEqual(user.id)
        expect(result.name).not.toEqual(user.name)
        expect(result.email).toEqual(userUpdateData.email)
    })

    it('Should throw an error if email is already in use', async () => {
        const user1 = await createTestUser()
        const user2 = await createTestUser()

        const updateData = { id: user1.id, email: user2.email }

        await expect(updateUserService.execute(updateData, user1)).rejects.toEqual(
            new AppError('E-mail já em uso.', 400)
        )
    })
})
