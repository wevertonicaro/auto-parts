import AppError from "http/error/AppError";
import { ICreateGroupUserDto } from "modules/GroupUser/dtos/GroupUser.dto";
import { GroupUser } from "shared/infra/typeorm/entities/GroupUsers";
import { Repository } from "typeorm";
import { IGroupUserRepository } from "../IGroupUserRepository";
import { dataBaseConnection } from './../../../../shared/infra/typeorm/database/dataSource';

export class GroupUserRepository implements IGroupUserRepository {
  private repository: Repository<GroupUser>

  constructor() {
    this.repository = dataBaseConnection.getRepository(GroupUser)
  }

  async create(data: ICreateGroupUserDto): Promise<GroupUser> {
    const createGroupUser = this.repository.create(data)
    return await this.repository.save(createGroupUser)
  }

  async find(): Promise<GroupUser[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<GroupUser> {
    return await this.repository.findOneBy({id})
  }

  async findByDescription(description: string): Promise<GroupUser> {
    return await this.repository.findOneBy({description})
  }

  async update(id: number, data: any): Promise<GroupUser | any> {
    const updateResult = await this.repository.update(id, data) 
    if (updateResult.raw.affectedRows < 0) {
      throw new AppError('Atualização não efetuada')
    } else {
      return await this.repository.findOneBy({id})
    }
  }

  async delete(id: number): Promise<boolean | string> {
    const deleteGroupUser = await this.repository.delete(id)
    if (deleteGroupUser.raw.affectedRows <= 0) {
      throw new AppError('Não foi possivel deletar grupo de usuários.')
    }
    return true
  }

}