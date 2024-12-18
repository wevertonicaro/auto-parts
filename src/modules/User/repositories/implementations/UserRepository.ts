import { Like, Repository } from 'typeorm'
import { dataBaseConnection } from '../../../../shared/infra/typeorm/database/dataSource'
import { User } from '../../../../shared/infra/typeorm/entities/Users'
import { ICreateUserDTO, IUpdateUserDTO } from '../../dtos/IUser.dto'
import { IUsersRepository } from '../IUserRepository'

export class UserRepository implements IUsersRepository {
    private repository: Repository<User>

    constructor() {
        this.repository = dataBaseConnection.getRepository(User)
    }

    async create(data: ICreateUserDTO): Promise<User | undefined> {
        const user = this.repository.create(data)
        await this.repository.save(user)
        return user
    }

    async find(): Promise<User[] | undefined> {
        const queryBuilder = this.repository.createQueryBuilder('user').take(50)
        const users = await queryBuilder.getMany()
        return users
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.repository.findOneBy({ email })
        return user
    }

    async findById(id: number): Promise<User | undefined> {
        const user = await this.repository.findOneBy({ id })
        return user
    }

    async findByName(name: string): Promise<User | undefined> {
        const user = await this.repository.findOne({ where: { name: Like(`%${name}%`) } })
        return user
    }

    async update(data: IUpdateUserDTO): Promise<void> {
        await this.repository.update(data.id, data)
        return
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id)
        return
    }
}
