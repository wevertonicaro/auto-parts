import AppError from "http/error/AppError"
import { IUsersRepository } from "modules/User/repositories/IUserRepository"
import { inject, injectable } from "tsyringe"

@injectable()
export class DeleteUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUsersRepository
    ) {}

    async execute(id: number): Promise<Boolean> {
        const userExists = await this.userRepository.findById(id)
        if (!userExists) throw new AppError('Usuário não encontrado.', 404)
        await this.userRepository.delete(id)
        return
    }
}