import { UserToken } from '../../../shared/infra/typeorm/entities/UserToken'
import { ICreateUserToken } from '../dtos/Auth.dto'

export interface IUserTokensRepository {
    create(data: ICreateUserToken): Promise<UserToken>
    findByUserId(userId: number): Promise<UserToken>
    findByUserIdAndRefreshToken(userId: number, token: string): Promise<UserToken>
    findByRefreshToken(token: string): Promise<UserToken>
    update(data: UserToken): Promise<UserToken | boolean>
    deleteById(id: number): Promise<boolean>
}
