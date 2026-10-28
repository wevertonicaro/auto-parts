import { UserToken } from '../../../shared/infra/typeorm/entities/UserToken'
import { ICreateUserToken } from '../dtos/Auth.dto'

export interface IUserTokensRepository {
    create(data: ICreateUserToken): Promise<UserToken>
    findByUserId(userId: number): Promise<UserToken | null>
    findByUserIdAndRefreshToken(userId: number, token: string): Promise<UserToken | null>
    findByRefreshToken(token: string): Promise<UserToken | null>
    update(data: UserToken): Promise<UserToken | null>
    deleteById(id: number): Promise<boolean>
}