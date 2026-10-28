
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import AppError from '../../../../http/error/AppError'
import { logger } from '../../../../shared/utils/logger'
import { RefreshTokenService } from './RefreshToken.service'

export class RefreshTokenController {
  async handler(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const token =
        request.body?.token ??
        request.headers['x-access-token'] ??
        request.query.token


      if (typeof token !== 'string' || !token.trim()) {
        throw new AppError('Refresh token não informado.', 400)
      }

      const refreshTokenService = container.resolve(
        RefreshTokenService
      )

      const result = await refreshTokenService.execute(token)

      logger.info('Token atualizado com sucesso.', {
        context: 'RefreshTokenController'
      })

      return response.status(200).json(result)
    } catch (error: unknown) {
      const message =
        error instanceof globalThis.Error
          ? error.message
          : 'Erro ao atualizar o token.'

      const statusCode =
        error instanceof AppError
          ? error.statusCode
          : 401

      logger.error('Erro ao atualizar o token.', {
        context: 'RefreshTokenController',
        payload: { error: message }
      })

      return response.status(statusCode).json({
        message:
          statusCode >= 500
            ? 'Erro interno ao atualizar o token.'
            : message
      })
    }
  }
}
