import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { logger } from '../../../../utils/logger'
import { FindUserService } from './FindUser.service'

export class FindUserController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { id, email } = request.query as { id: string, email: string }

    const userService = container.resolve(FindUserService)

    try {
      let users: any

      users = await userService.execute(Number(id), email)

      if (users) {
        // Remover o campo de senha antes de retornar a resposta
        if (Array.isArray(users)) {
          users = users.map(user => {
            if (user.password) {
              delete user.password
            }
            return user
          })
        } else if (users.password) {
          delete users.password
        }

        return response.status(200).json(users)
      }

      logger.error('Usuário(s) não encontrado')
      return response.status(404).json({ error: 'Usuário(s) não encontrado' })
    } catch (error) {
      logger.error(error.message)
      return response.status(500).json({ error: 'Internal server error' })
    }
  }
}