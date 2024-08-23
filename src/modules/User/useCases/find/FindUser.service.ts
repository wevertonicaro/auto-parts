import { IUserResponseDTO } from "modules/User/dtos/IUser.dto"
import { UserMap } from "modules/User/mapper/UserMap"
import { IUsersRepository } from "modules/User/repositories/IUserRepository"
import { inject, injectable } from "tsyringe"

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
        return await this.userRepository.find()
    }
}