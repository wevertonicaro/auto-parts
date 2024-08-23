import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateUserService } from './UpdateUser.service'

export class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { nome, email, senha, telefone, ativo, groupUserId } = request.body

    const userService = container.resolve(UpdateUserService)

    try {
      await userService.execute({
        id: Number(id),
        name: nome,
        email,
        password: senha,
        phone: telefone,
        active: ativo,
        groupUserId
      })
      return response.status(200).json({ message: 'User updated successfully' })
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}