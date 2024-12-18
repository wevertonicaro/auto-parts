import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { LoginService } from './Login.service'

export class LoginController {
    async handler(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body
        const loginService = container.resolve(LoginService)

        try {
            const tokens = await loginService.execute({ email, password })
            return response.json(tokens)
        } catch (error) {
            return response.status(401).json({ message: 'Error ao efetuar login.' })
        }
    }
}
