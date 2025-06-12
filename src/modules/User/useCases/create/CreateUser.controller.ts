import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { logger } from '../../../../shared/utils/logger'
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
                groupUserId: grupoId,
            })

            logger.info({ message: 'Usuário criado com sucesso!', payload: request.body })

            return response.status(201).json(user)
        } catch (error) {
            logger.error({
                message: 'Erro ao criar usuário',
                error: error.message,
                payload: request.body,
            })
            return response.status(400).json({ error: error.message })
        }
    }
}
