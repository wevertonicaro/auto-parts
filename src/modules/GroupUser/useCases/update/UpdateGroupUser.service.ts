import { IUpdateGroupUserDto } from 'modules/GroupUser/dtos/GroupUser.dto'
import { IGroupUserRepository } from 'modules/GroupUser/repositories/IGroupUserRepository'
import { updateGroupUserValidator } from 'modules/GroupUser/validator/groupUserValidator'
import { DayjsDateProvider } from 'shared/container/providers/DateProvider/implementations/dayJsDateProvider'
import { GroupUser } from 'shared/infra/typeorm/entities/GroupUsers'
import { inject, injectable } from 'tsyringe'
import AppError from '../../../../http/error/AppError'
import validatorObject from '../../../../utils/yup/location.validation'

@injectable()
export class UpdateGroupUserService {
    constructor(
        @inject('GroupUserRepository')
        private groupUserRepository: IGroupUserRepository
    ) {}

    async execute(data: IUpdateGroupUserDto): Promise<GroupUser> {
        await validatorObject(updateGroupUserValidator, data)

        const group = await this.groupUserRepository.findById(data.id)

        if (!group) {
            throw new AppError('Grupo não encontrado.', 404)
        }

        group.description = data.description ?? undefined
        group.updatedAt = new DayjsDateProvider().dateNow()

        const update = await this.groupUserRepository.update(group.id, group)

        return update
    }
}
