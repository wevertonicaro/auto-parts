import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { logger } from '../../../../shared/utils/logger'
import { RefreshTokenService } from './RefreshToken.service'

export class RefreshTokenController {
    async handler(request: Request, response: Response): Promise<Response> {
        try {
            const token =
                request.body.token || request.headers['x-access-token'] || request.query.token

            const refreshTokenUseCase = container.resolve(RefreshTokenService)

            const refresh_token = await refreshTokenUseCase.execute(token)

            if (refresh_token) {
                logger.info('Token atualizado com sucesso.', {
                    context: 'RefreshTokenController',
                    payload: { token },
                })
            }

            return response.status(200).json(refresh_token)
        } catch (error) {
            logger.error('Erro ao atualizar o token.', {
                payload: {
                    error: error.message,
                },
            })
            return response
                .status(401)
                .json({ error: error.message, message: 'Token não atualizado.' })
        }
    }
}
