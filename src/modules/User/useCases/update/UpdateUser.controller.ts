import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { logger } from '../../../../shared/utils/logger'
import { IUpdateUserDTO } from '../../dtos/IUser.dto'
import { UpdateUserService } from './UpdateUser.service'

export class UpdateUserController {
    async handler(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const data: IUpdateUserDTO = request.body
        const userLogged = request.user

        data.id = Number(id)

        const userService = container.resolve(UpdateUserService)

        try {
            const update = await userService.execute(data, userLogged)
            logger.info({
                message: 'Usuário atualizado com sucesso',
                payload: { id, data },
                user: userLogged,
            })
            return response.status(200).json({ message: 'Usuário atualizado com sucesso', update })
        } catch (error) {
            logger.error({
                message: 'Error ao atualizar usuário',
                error: error.message,
                payload: { id, data, userLogged },
            })
            return response.status(400).json({ error: error.message })
        }
    }
}
