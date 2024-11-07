import { Request, Response } from 'express'
import { IUpdateUserDTO } from 'modules/User/dtos/IUser.dto'
import { container } from 'tsyringe'
import { UpdateUserService } from './UpdateUser.service'

export class UpdateUserController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const data: IUpdateUserDTO = request.body

    data.id = Number(id)

    const userService = container.resolve(UpdateUserService)

    try {
      await userService.execute(data)
      return response.status(200).json({ message: 'User updated successfully' })
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}