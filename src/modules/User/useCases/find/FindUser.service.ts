import { inject, injectable } from 'tsyringe'
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
        if (id) return UserMap.toDTO(await this.userRepository.findById(Number(id)))
        if (email) return UserMap.toDTO(await this.userRepository.findByEmail(email))
        if (name) return UserMap.toDTO(await this.userRepository.findByName(name))
        return await this.userRepository.find()
    }
}
