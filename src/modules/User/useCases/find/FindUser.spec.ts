import { faker } from '@faker-js/faker'
import { DataSource } from 'typeorm'
import { createTestDatabase } from '../../../../shared/infra/typeorm/database/DataBaseTestes'
import { GroupUserRepository } from '../../../GroupUser/repositories/implementations/GroupUserRepository'
import { CreateGroupUserService } from '../../../GroupUser/useCases/create/CreateGroupUser.service'
import { UserRepository } from '../../repositories/implementations/UserRepository'
import { CreateUserService } from '../create/CreateUser.service'
import { FindUserService } from './FindUser.service'

describe('Find User', () => {
    let dataSource: DataSource
    let groupUserRepository: GroupUserRepository
    let createGroupUserService: CreateGroupUserService
    let userRepository: UserRepository
    let createUserService: CreateUserService
    let findUserService: FindUserService

    beforeAll(async () => {
        dataSource = await createTestDatabase()
        require('../../../../shared/infra/typeorm/database/dataSource').dataBaseConnection =
            dataSource

        groupUserRepository = new GroupUserRepository()
        userRepository = new UserRepository()
        createGroupUserService = new CreateGroupUserService(groupUserRepository)
        createUserService = new CreateUserService(userRepository, groupUserRepository)
        findUserService = new FindUserService(userRepository)
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

    it('Should be find a user by ID', async () => {
        const user = await createTestUser()

        const result = await findUserService.execute(user.id, undefined, undefined)

        expect(result).toHaveProperty('id')
        expect(result['id']).toBe(user.id)
    })

    it('Shold be able find user by email', async () => {
        const user = await createTestUser()

        const result = await findUserService.execute(undefined, user.email, undefined)

        expect(result).toHaveProperty('id')
        expect(result['email']).toBe(user.email)
    })

    it('Shold be able find user by name', async () => {
        const user = await createTestUser()

        const result = await findUserService.execute(undefined, undefined, user.name)

        expect(result).toHaveProperty('id')
        expect(result['email']).toBe(user.email)
    })

    it('Should be able to find all users', async () => {
        const user1 = await createTestUser()
        const user2 = await createTestUser()

        const result = await findUserService.execute()

        if (Array.isArray(result)) {
            expect(result).toHaveLength(2)
            expect(result.map(user => user.name)).toEqual(
                expect.arrayContaining([user1.name, user2.name])
            )
        } else {
            throw new Error('Expected an array but got a single object')
        }
    })
})
