
import { compare } from 'bcryptjs'
import moment from 'moment-timezone'
import { inject, injectable } from 'tsyringe'

import * as auth from '../../../../config/authToken'
import AppError from '../../../../http/error/AppError'
import validatorObject from '../../../../shared/utils/yup/location.validation'
import { UserMap } from '../../../User/mapper/UserMap'
import { IUsersRepository } from '../../../User/repositories/IUserRepository'
import { IRequestLogin, IResponseLogin } from '../../dtos/Auth.dto'
import { IUserTokensRepository } from '../../repositories/IUserTokenRepository'
import { authenticateValidation } from '../../validator/AuthValidation'

@injectable()
export class LoginService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) {}

  async execute(data: IRequestLogin): Promise<IResponseLogin> {
    await validatorObject(authenticateValidation, data)

    const user = await this.userRepository.findByEmail(data.email)

    if (!user) {
      throw new AppError('Email ou senha incorretos.', 401)
    }

    const passwordMatch = await compare(data.password, user.password)

    if (!passwordMatch) {
      throw new AppError('Email ou senha incorretos.', 401)
    }

    const userForToken = UserMap.toDTO(user)

    const accessToken = auth.generateAccessToken(userForToken)

    const refreshToken = auth.generateRefreshToken(userForToken)

    const expiresDate = moment()
      .tz('America/Sao_Paulo')
      .add(auth.expiresTokenRefreshTime, 'hours')
      .format('YYYY-MM-DD HH:mm:ss')

    const userToken = await this.userTokensRepository.findByUserId(
      user.id
    )

    if (!userToken) {
      await this.userTokensRepository.create({
        userId: user.id,
        expiresDate,
        token: refreshToken
      })
    } else {
      userToken.token = refreshToken
      userToken.expiresDate = expiresDate

      await this.userTokensRepository.update(userToken)
    }

    return {
      token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }
  }
}
