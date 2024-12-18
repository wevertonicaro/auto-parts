import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'
import AppError from '../../../../http/error/AppError'
import { User } from '../../../../shared/infra/typeorm/entities/Users'
import validatorObject from '../../../../utils/yup/location.validation'
import { IGroupUserRepository } from '../../../GroupUser/repositories/IGroupUserRepository'
import { ICreateUserDTO } from '../../dtos/IUser.dto'
import { IUsersRepository } from '../../repositories/IUserRepository'
import { createUserValidator } from '../../validator/validatorUser'

@injectable()
export class CreateUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUsersRepository,

        @inject('GroupUserRepository')
        private groupUserRepository: IGroupUserRepository
    ) {}

    async execute(data: ICreateUserDTO): Promise<User> {
        await validatorObject(createUserValidator, data)

        const userAlreadyExists = await this.userRepository.findByEmail(data.email)
        if (userAlreadyExists) throw new AppError('Email já cadastrado', 400)

        if (data.password.length < 6)
            throw new AppError('Senha não pode ser menor que 6 caracteres')

        const passwordHash = await hash(data.password, 8)

        data.groupUserId = (await this.groupUserRepository.findById(data.groupUserId))?.id || null

        const user = await this.userRepository.create({
            name: data.name,
            password: passwordHash,
            email: data.email,
            active: true,
            phone: data.phone,
            groupUserId: data.groupUserId,
        })

        if (user && user.password) {
            delete user.password
        }

        return user
    }
}
