import { ICreateUserToken } from "modules/auth/dtos/Auth.dto";
import { dataBaseConnection } from "shared/infra/typeorm/database/dataSource";
import { UserToken } from "shared/infra/typeorm/entities/UserToken";
import { Repository } from "typeorm";
import { IUserTokensRepository } from "../IUserTokenRepository";

export class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = dataBaseConnection.getRepository(UserToken);
  }

  async create(data: ICreateUserToken): Promise<UserToken> {   
    
    const userToken = this.repository.create(data)
    await this.repository.save(userToken);
    return userToken;
  }

  async findByUserId(userId: number): Promise<UserToken> {
    const usertoken = await this.repository.findOneBy({ userId })
    return usertoken;
  }

  async findByUserIdAndRefreshToken(userId: number, token: string): Promise<UserToken> {
    const userTokens = await this.repository.findOneBy({
      userId,
      token,
    });

    return userTokens;
  }

  async findByRefreshToken(token: string): Promise<UserToken> {
    const userToken = await this.repository.findOneBy({ token });
    return userToken;
  }

  async update(data: UserToken): Promise<UserToken | boolean> {
    let id = data.id
    const update = await this.repository.update(id, data)
    
    if (update.raw.affectedRows > 0) {
      const userToken = await this.repository.findOneBy({id})
      return userToken
    }
    return false;
  }

  async deleteById(id: number): Promise<boolean> {
    try {
      await this.repository.delete(id);
      return true
    } catch (error) {
      return error
    }
  }
}