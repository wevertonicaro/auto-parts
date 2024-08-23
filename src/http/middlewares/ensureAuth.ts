import 'dotenv/config'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { UserRepository } from 'modules/User/repositories/implementations/UserRepository'
import { logger } from '../../utils/logger'
import AppError from '../error/AppError'

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

    request.user = {
      id: id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      active: Boolean(user.active),
      groupUserId: user.groupUserId
    };

    return next()
  } catch (err) {
    logger.error(err.message)
    throw new AppError(`Token inválido: ${err.message}`, 401)
  }
}