
import { verify } from 'jsonwebtoken'
import moment from 'moment-timezone'
import { inject, injectable } from 'tsyringe'

import * as auth from '../../../../config/authToken'
import AppError from '../../../../http/error/AppError'
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider'
import validatorObject from '../../../../shared/utils/yup/location.validation'
import { IPayload, ITokenResponse } from '../../dtos/Auth.dto'
import { IUserTokensRepository } from '../../repositories/IUserTokenRepository'
import { refreshTokenAuthenticateValidation } from '../../validator/AuthValidation'

@injectable()
export class RefreshTokenService {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    await validatorObject(
      refreshTokenAuthenticateValidation,
      { token }
    )

    const tokenDecode = verify(token, auth.secret) as IPayload

    if (
      !tokenDecode ||
      !tokenDecode.user ||
      tokenDecode.tokenType !== 'refresh'
    ) {
      throw new AppError('Refresh token inválido.', 401)
    }

    const userId = tokenDecode.user.id

    const userToken = await this.userTokensRepository.findByUserId(
      Number(userId)
    )

    if (!userToken) {
      throw new AppError('Registro de token não encontrado.', 404)
    }

    if (userToken.token !== token) {
      throw new AppError('Refresh token inválido ou revogado.', 401)
    }

    const accessToken = auth.generateAccessToken(tokenDecode.user)
    const refreshToken = auth.generateRefreshToken(tokenDecode.user)

    const expiresDate = moment()
      .tz('America/Sao_Paulo')
      .add(auth.expiresTokenRefreshTime, 'hours')
      .format('YYYY-MM-DD HH:mm:ss')

    userToken.token = refreshToken
    userToken.expiresDate = expiresDate
    userToken.updatedAt = this.dateProvider.dateNow()

    const result = await this.userTokensRepository.update(userToken)

    if (!result) {
      throw new AppError('Não foi possível atualizar o token.', 500)
    }

    return {
      message: 'Token atualizado com sucesso.',
      token: accessToken,
      refresh_token: refreshToken
    }
  }
}
