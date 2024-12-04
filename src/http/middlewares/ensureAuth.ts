import 'dotenv/config'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { UserRepository } from 'modules/User/repositories/implementations/UserRepository'
import { logger } from '../../utils/logger'
import AppError from '../error/AppError'
import { redisClient } from './rateLimiter'

interface IUserDecodedToken {
    id: number
    name: string
    email: string
}
interface ITokenPayload {
    token: string
    user: IUserDecodedToken
}

export async function ensureAuth(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization

    if (!authHeader) {
        throw new AppError('Token inválido', 401)
    }

    const [, token] = authHeader.split(' ')

    try {
        const decoded = await new Promise<ITokenPayload>((resolve, reject) => {
            verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(decoded as ITokenPayload)
                }
            })
        })

        const { id } = decoded.user

        const usersRepository = new UserRepository()

        const user = await usersRepository.findById(id)

        if (!user) {
            throw new AppError('Usuário não encontrado', 404)
        }

        const userCacheKey = `user:${id}`
        let userCacheData = await redisClient.get(userCacheKey)

        if (!userCacheData) {
            console.log('Usuário não encontrado no cache. Buscando no banco de dados...')

            userCacheData = JSON.stringify({
                id: user.id,
                email: user.email,
                name: user.name,
                phone: user.phone,
                active: Boolean(user.active),
                groupUserId: user.groupUserId,
            })
            await redisClient.setEx(userCacheKey, 3600, userCacheData)
        }

        request.user = JSON.parse(userCacheData)

        return next()
    } catch (err) {
        logger.error(err.message)
        throw new AppError(`Token inválido: ${err.message}`, 401)
    }
}
