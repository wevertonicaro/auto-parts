
import { sign, type SignOptions } from 'jsonwebtoken'
import type { IUserResponseDTO } from '../modules/User/dtos/IUser.dto'

function getRequiredEnv(name: string): string {
    const value = process.env[name]

    if (!value) {
        throw new Error(`Variável de ambiente ausente: ${name}`)
    }

    return value
}

export const secret = getRequiredEnv('JWT_SECRET')

export const expiresToken = getRequiredEnv('EXPIRES_TOKEN')

export const expiresTokenRefresh = getRequiredEnv(
    'EXPIRES_REFRESH_TOKEN'
)

export const expiresTokenRefreshTime = Number(
    getRequiredEnv('EXPIRES_REFRESH_TOKEN_TIME')
)

if (
    !Number.isFinite(expiresTokenRefreshTime) ||
    expiresTokenRefreshTime <= 0
) {
    throw new Error('EXPIRES_REFRESH_TOKEN_TIME inválido')
}

type TokenUser = Pick<IUserResponseDTO, 'id'>

export function generateAccessToken(user: TokenUser): string {
    return sign(
        {
            user: { id: user.id },
            tokenType: 'access',
        },
        secret,
        {
            expiresIn: expiresToken as SignOptions['expiresIn'],
        }
    )
}

export function generateRefreshToken(user: TokenUser): string {
    return sign(
        {
            user: { id: user.id },
            tokenType: 'refresh',
        },
        secret,
        {
            expiresIn: expiresTokenRefresh as SignOptions['expiresIn'],
        }
    )
}
