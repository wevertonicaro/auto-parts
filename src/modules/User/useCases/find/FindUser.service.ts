import { inject, injectable } from 'tsyringe'
import AppError from '../../../../http/error/AppError'
import { IUserResponseDTO } from '../../dtos/IUser.dto'
import { UserMap } from '../../mapper/UserMap'
import { IUsersRepository } from '../../repositories/IUserRepository'

@injectable()
export class FindUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUsersRepository
    ) {}

    async execute(
        id?: number,
        email?: string,
        name?: string
    ): Promise<IUserResponseDTO[] | IUserResponseDTO> {
        if (!id && !email && !name) {
            const users = await this.userRepository.find()
            return users.map(UserMap.toDTO)
        }

        if (id) {
            const user = await this.userRepository.findById(id)
            return UserMap.toDTO(user)
        }

        if (email) {
            const user = await this.userRepository.findByEmail(email)
            return UserMap.toDTO(user)
        }

        if (name) {
            const user = await this.userRepository.findByName(name)
            return UserMap.toDTO(user)
        }

        throw new AppError('Parametro de busca inválido.')
    }
}
