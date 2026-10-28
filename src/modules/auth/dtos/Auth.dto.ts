import { User } from '../../../shared/infra/typeorm/entities/Users'

export interface IRequestLogin {
    email: string
    password: string
}

export interface IResponseLogin {
    user: {
        name: string
        email: string
        id: number
    }
    token: string,
    refresh_token: string
}

export interface IPayload {
    user: User
    email: string
    tokenType: 'access' | 'refresh'
}

export interface ITokenResponse {
    token: string,
    refresh_token: string,
    message: string
}

export interface ICreateUserToken {
    userId: number
    expiresDate: string
    token: string
}

export interface IUpdateUserToken {
    userId: number
    expiresDate: string
    token: string
    refresh_token: string
}
