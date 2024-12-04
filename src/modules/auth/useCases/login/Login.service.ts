import { compare } from 'bcryptjs'
import { IRequestLogin, IResponseLogin } from 'modules/auth/dtos/Auth.dto'
import { IUserTokensRepository } from 'modules/auth/repositories/IUserTokenRepository'
import { authenticateValidation } from 'modules/auth/validator/AuthValidation'
import { UserMap } from 'modules/User/mapper/UserMap'
import { IUsersRepository } from 'modules/User/repositories/IUserRepository'
import { inject, injectable } from 'tsyringe'
import * as auth from '../../../../config/authToken'
import AppError from '../../../../http/error/AppError'
import validatorObject from '../../../../utils/yup/location.validation'
import { RefreshTokenService } from '../refreshToken/RefreshToken.service'

@injectable()
export class LoginService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUsersRepository,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,

        private refreshTokenUseCase: RefreshTokenService
    ) {}

    async execute(data: IRequestLogin): Promise<IResponseLogin> {
        await validatorObject(authenticateValidation, data)

        const user = await this.userRepository.findByEmail(data.email)

        if (!user) {
            throw new AppError(`Email or password incorrect`, 401)
        }

        const passwordMatch = await compare(data.password, user.password)

        if (!passwordMatch) {
            throw new AppError(`Email or password incorrect`, 401)
        }

        const userForToken = UserMap.toDTO(user)

        let token: string
        let isRefresh: boolean

        const userToken = await this.userTokensRepository.findByUserId(user.id)

        if (!userToken) {
            isRefresh = false
            token = auth.generateAccessToken(userForToken, isRefresh)

            await this.userTokensRepository.create({
                userId: user.id,
                expiresDate: auth.expiresToken,
                token,
            })
        } else {
            isRefresh = true
            token = auth.generateAccessToken(userForToken, isRefresh)
            const result = await this.refreshTokenUseCase.execute(token)

            if (!result.token) {
                throw new AppError('Erro ao atualizar o refresh token', 500)
            }

            token = result.token
        }

        const tokenResponse: IResponseLogin = {
            token,
            user: {
                name: user.name,
                email: user.email,
                id: user.id,
            },
        }

        return tokenResponse
    }
}
