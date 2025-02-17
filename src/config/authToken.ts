import { sign } from 'jsonwebtoken'
import { UserMap } from '../modules/User/mapper/UserMap'

export const secret: string = process.env.JWT_SECRET
export const expiresToken: string = process.env.EXPIRES_TOKEN
export const expiresTokenRefresh: string = process.env.EXPIRES_REFRESH_TOKEN
export const expiresTokenRefreshTime: number = Number(process.env.EXPIRES_REFRESH_TOKEN_TIME)

export const generateAccessToken = (user: UserMap, isRefresh: boolean): string => {
    try {
        const expiresIn = isRefresh ? expiresTokenRefresh : expiresToken

        if (!secret) {
            throw new Error('JWT secret is not defined')
        }

        const accessToken = sign({ user }, secret, { expiresIn })
        return accessToken
    } catch (error) {
        console.error('Error generating access token:', error)
        throw new Error('Error generating access token')
    }
}
