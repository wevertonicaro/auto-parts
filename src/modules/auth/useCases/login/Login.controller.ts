import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { logger } from '../../../../shared/utils/logger'
import { LoginService } from './Login.service'

export class LoginController {
    async handler(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body
        const loginService = container.resolve(LoginService)

        try {
            const tokens = await loginService.execute({ email, password })
            logger.info('Usuário logado com sucesso.', {
                context: 'LoginController',
                payload: { email },
            })
            return response.json(tokens)
        } catch (error) {
            logger.error('Error ao efetuar login.', {
                context: 'LoginController',
                payload: {
                    email,
                    error: error.message,
                },
            })
            return response.status(401).json({ message: 'Error ao efetuar login.' })
        }
    }
}
