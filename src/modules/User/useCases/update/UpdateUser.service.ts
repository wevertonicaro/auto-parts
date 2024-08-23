import { hash } from "bcryptjs"
import AppError from "http/error/AppError"
import { ICreateUserDTO } from "modules/User/dtos/IUser.dto"
import { IUsersRepository } from "modules/User/repositories/IUserRepository"
import { updateUserValidator } from "modules/User/validator/validatorUser"
import { DayjsDateProvider } from "shared/container/providers/DateProvider/implementations/dayJsDateProvider"
import { inject, injectable } from "tsyringe"
import validatorObject from '../../../../utils/yup/location.validation'

@injectable()
export class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository
  ) { }

  async execute(
    data: ICreateUserDTO
  ): Promise<boolean> {
    await validatorObject(updateUserValidator, data)

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
      user.groupUserId = data.groupUserId !== user.groupUserId ? data.groupUserId : user.groupUserId
    }

    user.updatedAt = new DayjsDateProvider().dateNow()

    await this.userRepository.update(user)
    return
  }
}