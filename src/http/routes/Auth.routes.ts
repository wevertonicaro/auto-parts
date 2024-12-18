import { Router } from 'express'
import { LoginController } from '../../modules/auth/useCases/login/Login.controller'
import { RefreshTokenController } from '../../modules/auth/useCases/refreshToken/RefreshToken.controller'

const authRouter = Router()

const loginController = new LoginController()

const refreshTokenController = new RefreshTokenController()

authRouter.post('/login', (request, response) => {
    loginController.handler(request, response)
})

authRouter.post('/refresh', (request, response) => {
    refreshTokenController.handler(request, response)
})

export { authRouter }
