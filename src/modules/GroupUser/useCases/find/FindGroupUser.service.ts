import { inject, injectable } from 'tsyringe'
import AppError from '../../../../http/error/AppError'
import { GroupUser } from '../../../../shared/infra/typeorm/entities/GroupUsers'
import { IGroupUserRepository } from '../../repositories/IGroupUserRepository'

@injectable()
export class GetGroupUserService {
    constructor(
        @inject('GroupUserRepository')
        private groupUserRepository: IGroupUserRepository
    ) {}

    async execute(id?: number, description?: string): Promise<GroupUser[]> {
        let groupUsers: GroupUser[] = []

        if (id) {
            const group = await this.groupUserRepository.findById(id)

            if (!group) {
                throw new AppError('Grupo não encontrado.', 404)
            }
            groupUsers = [group]
        } else if (description && description !== 'undefined') {
            const group = await this.groupUserRepository.findByDescription(description)

            if (!group) {
                throw new AppError('Grupo não encontrado.', 404)
            }
            groupUsers = [group]
        } else {
            groupUsers = await this.groupUserRepository.find()

            if (groupUsers.length === 0) {
                throw new AppError('Nenhum grupo encontrado.', 404)
            }
        }

        return groupUsers
    }
}
