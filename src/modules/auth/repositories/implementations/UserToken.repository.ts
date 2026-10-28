import { Repository } from 'typeorm'
import { dataBaseConnection } from '../../../../shared/infra/typeorm/database/dataSource'
import { UserToken } from '../../../../shared/infra/typeorm/entities/UserToken'
import { ICreateUserToken } from '../../dtos/Auth.dto'
import { IUserTokensRepository } from '../IUserTokenRepository'

export class UserTokensRepository implements IUserTokensRepository {
    private repository: Repository<UserToken>

    constructor() {
        this.repository = dataBaseConnection.getRepository(UserToken)
    }

    async create(data: ICreateUserToken): Promise<UserToken> {
        const userToken = this.repository.create(data)
        return this.repository.save(userToken)
    }

    async findByUserId(userId: number): Promise<UserToken | null> {
        return this.repository.findOneBy({ userId })
    }

    async findByUserIdAndRefreshToken(
        userId: number,
        token: string,
    ): Promise<UserToken | null> {
        return this.repository.findOneBy({ userId, token })
    }

    async findByRefreshToken(token: string): Promise<UserToken | null> {
        return this.repository.findOneBy({ token })
    }

    async update(data: UserToken): Promise<UserToken | null> {
        const { id, ...fields } = data

        const result = await this.repository.update(id, fields)

        if (!result.affected) {
            return null
        }

        return this.repository.findOneBy({ id })
    }

    async deleteById(id: number): Promise<boolean> {
        const result = await this.repository.delete(id)
        return !!result.affected
    }
}