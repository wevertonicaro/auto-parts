import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { logger } from '../../../../shared/utils/logger'
import { ICreateGroupUserDto } from '../../dtos/GroupUser.dto'
import { CreateGroupUserService } from './CreateGroupUser.service'

export class CreateGroupUserController {
    async handler(request: Request, response: Response): Promise<Response> {
        const data: ICreateGroupUserDto = request.body
        try {
            const createGroupUserService = container.resolve(CreateGroupUserService)

            const groupUser = await createGroupUserService.execute(data)

            logger.info({ message: 'Grupo criado com sucesso!', payload: data })
            return response.status(201).json(groupUser)
        } catch (error) {
            logger.error({
                message: 'Error ao criar grupo de usuário',
                error: error.message,
                payload: data,
            })
            return response.status(400).json({ error: error.message })
        }
    }
}
