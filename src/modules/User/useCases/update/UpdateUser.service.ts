import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'
import AppError from '../../../../http/error/AppError'
import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/dayJsDateProvider'
import validatorObject from '../../../../utils/yup/location.validation'
import { IUpdateUserDTO, IUserResponseDTO } from '../../dtos/IUser.dto'
import { IUsersRepository } from '../../repositories/IUserRepository'
import { updateUserValidator } from '../../validator/validatorUser'

@injectable()
export class UpdateUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUsersRepository
    ) {}

    async execute(data: IUpdateUserDTO, userLogged: IUserResponseDTO): Promise<boolean> {
        await validatorObject(updateUserValidator, data)

        if (userLogged.id !== data.id && userLogged.groupUserId !== 1) {
            throw new AppError('Usuário não tem permissão para essa ação', 401)
        }

        const user = await this.userRepository.findById(data.id)

        if (!user) {
            throw new AppError('Usuário não encontrado.', 404)
        }

        if (data.email && data.email !== user.email) {
            const emailAlreadyExists = await this.userRepository.findByEmail(data.email)

            if (emailAlreadyExists) {
                throw new AppError('E-mail já em uso.', 400)
            }

            user.email = data.email
        }

        if (data.name) {
            user.name = data.name !== user.name ? data.name : user.name
        }

        if (data.password) {
            const hashedPassword = await hash(data.password, 8)
            user.password = hashedPassword
        }

        if (data.phone) {
            user.phone = data.phone !== user.phone ? data.phone : user.phone
        }

        if (data.active) {
            user.active = data.active !== user.active ? data.active : user.active
        }

        if (data.groupUserId) {
            user.groupUserId =
                data.groupUserId !== user.groupUserId ? data.groupUserId : user.groupUserId
        }

        user.updatedAt = new DayjsDateProvider().dateNow()

        await this.userRepository.update(user)
        return
    }
}
