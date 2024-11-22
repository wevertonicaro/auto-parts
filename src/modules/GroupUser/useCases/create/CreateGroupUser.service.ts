import AppError from "http/error/AppError"
import { ICreateGroupUserDto } from "modules/GroupUser/dtos/GroupUser.dto"
import { IGroupUserRepository } from "modules/GroupUser/repositories/IGroupUserRepository"
import { createGroupUserValidator } from "modules/GroupUser/validator/groupUserValidator"
import { GroupUser } from "shared/infra/typeorm/entities/GroupUsers"
import { inject, injectable } from "tsyringe"
import validatorObject from '../../../../utils/yup/location.validation'

@injectable()
export class CreateGroupUserService {
  constructor(
    @inject('GroupUserRepository')
    private groupUserRepository: IGroupUserRepository
  ) { }

  async execute(data: ICreateGroupUserDto): Promise<GroupUser> {
    await validatorObject(createGroupUserValidator, data)

    const groupExists = await this.groupUserRepository.findByDescription(data.description)

    if (groupExists) throw new AppError('Grupo já existente.')
    
      try {
      const createGroup = await this.groupUserRepository.create(data)
      return createGroup
    } catch (error: any) {
      return error.message
    }
  }
}