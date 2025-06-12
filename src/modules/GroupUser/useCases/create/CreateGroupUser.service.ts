import { inject, injectable } from 'tsyringe'
import AppError from '../../../../http/error/AppError'
import { GroupUser } from '../../../../shared/infra/typeorm/entities/GroupUsers'
import validatorObject from '../../../../shared/utils/yup/location.validation'
import { ICreateGroupUserDto } from '../../dtos/GroupUser.dto'
import { IGroupUserRepository } from '../../repositories/IGroupUserRepository'
import { createGroupUserValidator } from '../../validator/groupUserValidator'

@injectable()
export class CreateGroupUserService {
    constructor(
        @inject('GroupUserRepository')
        private groupUserRepository: IGroupUserRepository
    ) {}

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
