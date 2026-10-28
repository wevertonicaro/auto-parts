
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import AppError from '../../../../http/error/AppError'
import { logger } from '../../../../shared/utils/logger'
import { LoginService } from './Login.service'

export class LoginController {
  async handler(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { email, password } = request.body

    try {
      const loginService = container.resolve(LoginService)

      const tokens = await loginService.execute({
        email,
        password
      })

      logger.info('Usuário autenticado com sucesso.', {
        context: 'LoginController',
        payload: { email }
      })

      return response.status(200).json(tokens)
    } catch (error: unknown) {
      const message =
        error instanceof globalThis.Error
          ? error.message
          : 'Erro interno ao efetuar login.'

      const statusCode =
        error instanceof AppError
          ? error.statusCode
          : 500

      logger.error('Erro ao efetuar login.', {
        context: 'LoginController',
        payload: { email, error: message }
      })

      return response.status(statusCode).json({
        message:
          statusCode === 500
            ? 'Erro interno ao efetuar login.'
            : message
      })
    }
  }
}
