import { sign, verify } from 'jsonwebtoken'
import { IPayload, ITokenResponse } from 'modules/auth/dtos/Auth.dto'
import { IUserTokensRepository } from 'modules/auth/repositories/IUserTokenRepository'
import { refreshTokenAuthenticateValidation } from 'modules/auth/validator/AuthValidation'
import moment from 'moment-timezone'
import { IDateProvider } from 'shared/container/providers/DateProvider/IDateProvider'
import { DayjsDateProvider } from 'shared/container/providers/DateProvider/implementations/dayJsDateProvider'
import { inject, injectable } from 'tsyringe'
import * as auth from '../../../../config/authToken'
import AppError from '../../../../http/error/AppError'
import validatorObject from '../../../../utils/yup/location.validation'

@injectable()
export class RefreshTokenService {
    constructor(
        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,

        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider
    ) {}

    async execute(token: string): Promise<ITokenResponse> {
        await validatorObject(refreshTokenAuthenticateValidation, { token })

        try {
            const tokenDecode = verify(token, auth.secret, { ignoreExpiration: true }) as IPayload

            if (!tokenDecode || !tokenDecode.user) {
                throw new AppError('Token inválido', 401)
            }

            const userId = tokenDecode['user'].id

            const userToken = await this.userTokensRepository.findByUserId(Number(userId))

            if (!userToken) {
                throw new AppError('Registro não encontrado!', 404)
            }

            const refresh_token = sign({ user: tokenDecode.user }, auth.secret, {
                expiresIn: auth.expiresTokenRefresh,
            })

            const expiresDate = this.dateProvider.addHours(auth.expiresTokenRefreshTime)

            userToken.token = refresh_token
            userToken.expiresDate = moment(expiresDate)
                .tz('America/Sao_Paulo')
                .format('YYYY-MM-DD HH:mm:ss')
            userToken.updatedAt = new DayjsDateProvider().dateNow()

            const result = await this.userTokensRepository.update(userToken)

            if (!result) {
                throw new AppError('Token não atualizado.', 401)
            }

            return {
                message: 'Token atualizado com sucesso.',
                token: refresh_token,
            }
        } catch (error) {
            return error
        }
    }
}
