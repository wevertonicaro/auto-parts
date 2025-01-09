import { faker } from '@faker-js/faker/.'
import { DataSource } from 'typeorm'
import AppError from '../../../../http/error/AppError'
import { createTestDatabase } from '../../../../shared/infra/typeorm/database/DataBaseTestes'
import { GroupUserRepository } from '../../../GroupUser/repositories/implementations/GroupUserRepository'
import { CreateGroupUserService } from '../../../GroupUser/useCases/create/CreateGroupUser.service'
import { UserRepository } from '../../repositories/implementations/UserRepository'
import { CreateUserService } from './CreateUser.service'

describe('Create User', () => {
    let dataSource: DataSource
    let groupUserRepository: GroupUserRepository
    let createGroupUserService: CreateGroupUserService
    let userRepository: UserRepository
    let createUserService: CreateUserService

    beforeAll(async () => {
        dataSource = await createTestDatabase()
        require('../../../../shared/infra/typeorm/database/dataSource').dataBaseConnection =
            dataSource
        groupUserRepository = new GroupUserRepository()
        userRepository = new UserRepository()
        createGroupUserService = new CreateGroupUserService(groupUserRepository)
        createUserService = new CreateUserService(userRepository, groupUserRepository)
    })

    afterAll(async () => {
        await dataSource.destroy()
    })

    beforeEach(async () => {
        await dataSource.synchronize(true)
    })

    const createTestGroup = async (description = 'Teste') => {
        return createGroupUserService.execute({ description })
    }

    const createTestUser = async (overrides = {}) => {
        const group = await createTestGroup()
        const defaultUserData = {
            email: 'test@example.com',
            name: faker.person.fullName(),
            password: faker.internet.password({ length: 8 }),
            phone: faker.phone.number(),
            groupUserId: group.id,
        }
        return { group, userData: { ...defaultUserData, ...overrides } }
    }

    it('Should create a user', async () => {
        const { userData } = await createTestUser()

        const user = await createUserService.execute(userData)

        expect(user).toHaveProperty('id')
        expect(user.name).toEqual(userData.name)
        expect(user.email).toEqual(userData.email)
    })

    it('Should throw an error if the group user does not exist', async () => {
        const { userData } = await createTestUser({ groupUserId: 5 })

        await expect(createUserService.execute(userData)).rejects.toBeInstanceOf(AppError)
        await expect(createUserService.execute(userData)).rejects.toMatchObject({
            message: 'Grupo não encontrado.',
            statusCode: 404,
        })
    })

    it('Should throw an error if email is already registered', async () => {
        const { userData } = await createTestUser()

        await createUserService.execute(userData)

        const userDataWithDuplicateEmail = {
            ...userData,
            email: 'test@example.com',
        }

        await expect(createUserService.execute(userDataWithDuplicateEmail)).rejects.toEqual(
            new AppError('Email já cadastrado')
        )
    })
})
