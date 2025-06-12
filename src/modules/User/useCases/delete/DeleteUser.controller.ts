import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { logger } from '../../../../shared/utils/logger'
import { DeleteUserService } from './DeleteUser.service'

export class DeleteUserController {
    async handler(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const userLogged = request.user

        const userService = container.resolve(DeleteUserService)

        try {
            await userService.execute(Number(id), userLogged)
            return response.status(204).end()
        } catch (error) {
            logger.error(error.message)
            return response.status(400).json({ error: error.message })
        }
    }
}
