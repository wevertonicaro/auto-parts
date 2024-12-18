import { NextFunction, Request, Response } from 'express'
import { RateLimiterRedis } from 'rate-limiter-flexible'
import * as redis from 'redis'
import { config } from '../../config/api'
import AppError from '../error/AppError'

export const redisClient = redis.createClient({
    socket: {
        host: config.REDIS.HOST,
        port: Number(config.REDIS.PORT),
        sessionTimeout: 1000,
    },
})

redisClient
    .connect()
    .then(() => {
        console.log('Redis conectado.')
    })
    .catch(err => {
        console.error('Erro ao conectar ao Redis:', err)
    })

const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rateLimiter',
    points: 10,
    duration: 1,
})

export default async function rateLimiter(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    try {
        await limiter.consume(request.ip)
        return next()
    } catch (e) {
        console.warn(`IP bloqueado por muitas requisições: ${request.ip}`)
        console.error('Erro no rate limiter:', e)

        throw new AppError('Too many requests', 429)
    }
}
