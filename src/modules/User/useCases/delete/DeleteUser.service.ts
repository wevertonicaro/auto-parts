import { inject, injectable } from 'tsyringe'
import AppError from '../../../../http/error/AppError'
import { IUserResponseDTO } from '../../dtos/IUser.dto'
import { IUsersRepository } from '../../repositories/IUserRepository'

@injectable()
export class DeleteUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUsersRepository
    ) {}

    async execute(id: number, userLogged: IUserResponseDTO): Promise<Boolean> {
        if (userLogged.id !== id && userLogged.groupUserId !== 1) {
            throw new AppError('Usuário não tem permissão para essa ação', 401)
        }

        const userExists = await this.userRepository.findById(id)
        if (!userExists) throw new AppError('Usuário não encontrado.', 404)

        try {
            await this.userRepository.delete(id)
            return true
        } catch (error) {
            return false
        }
    }
}
