import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { logger } from '../../../../utils/logger'
import { CreateUserService } from './CreateUser.service'

export class CreateUserController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { nome, email, senha, telefone, grupoId } = request.body
    const userService = container.resolve(CreateUserService)

    try {
      const user = await userService.execute({
        name: nome,
        email,
        password: senha,
        phone: telefone,
        groupUserId: grupoId
      })

      return response.status(201).json(user)
    } catch (error) {
      logger.error(error.message)
      return response.status(400).json({ error: error.message })
    }
  }
}