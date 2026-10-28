
import { compare } from 'bcryptjs'
import 'reflect-metadata'
import * as auth from '../../../../config/authToken'
import AppError from '../../../../http/error/AppError'
import validatorObject from '../../../../shared/utils/yup/location.validation'
import { UserMap } from '../../../User/mapper/UserMap'
import { IUsersRepository } from '../../../User/repositories/IUserRepository'
import { IUserTokensRepository } from '../../repositories/IUserTokenRepository'
import { LoginService } from './Login.service'

jest.mock('bcryptjs', () => ({
  compare: jest.fn()
}))

jest.mock('../../../../config/authToken', () => ({
  generateAccessToken: jest.fn(),
  generateRefreshToken: jest.fn(),
  expiresTokenRefreshTime: 24
}))

jest.mock('../../../../shared/utils/yup/location.validation', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('../../../User/mapper/UserMap', () => ({
  UserMap: {
    toDTO: jest.fn()
  }
}))

describe('LoginService', () => {
  let loginService: LoginService
  let userRepository: IUsersRepository
  let userTokensRepository: IUserTokensRepository

  const user = {
    id: 1,
    name: 'Test User',
    email: 'test@email.com',
    password: 'hashed-password'
  }

  const userForToken = {
    id: 1,
    name: 'Test User',
    email: 'test@email.com'
  }

  const loginData = {
    email: 'test@email.com',
    password: 'plain-password'
  }

  beforeEach(() => {
    jest.clearAllMocks()

    userRepository = {
      findByEmail: jest.fn()
    } as unknown as IUsersRepository

    userTokensRepository = {
      findByUserId: jest.fn(),
      create: jest.fn(),
      update: jest.fn()
    } as unknown as IUserTokensRepository

    loginService = new LoginService(
      userRepository,
      userTokensRepository
    )

    ;(validatorObject as jest.Mock).mockResolvedValue(undefined)
    ;(compare as jest.Mock).mockResolvedValue(true)
    ;(UserMap.toDTO as jest.Mock).mockReturnValue(userForToken)

    ;(auth.generateAccessToken as jest.Mock).mockReturnValue(
      'access-token'
    )

    ;(auth.generateRefreshToken as jest.Mock).mockReturnValue(
      'refresh-token'
    )
  })

  describe('execute', () => {
    it('should authenticate a user with valid credentials', async () => {
      ;(userRepository.findByEmail as jest.Mock).mockResolvedValue(user)
      ;(userTokensRepository.findByUserId as jest.Mock).mockResolvedValue(
        null
      )

      const result = await loginService.execute(loginData)

      expect(validatorObject).toHaveBeenCalled()
      expect(userRepository.findByEmail).toHaveBeenCalledWith(
        loginData.email
      )
      expect(compare).toHaveBeenCalledWith(
        loginData.password,
        user.password
      )

      expect(auth.generateAccessToken).toHaveBeenCalledWith(userForToken)
      expect(auth.generateRefreshToken).toHaveBeenCalledWith(userForToken)

      expect(result).toEqual({
        token: 'access-token',
        refresh_token: 'refresh-token',
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      })
    })

    it('should throw an AppError when the email does not exist', async () => {
      ;(userRepository.findByEmail as jest.Mock).mockResolvedValue(null)

      await expect(loginService.execute(loginData)).rejects.toThrow(
        new AppError('Email ou senha incorretos.', 401)
      )

      expect(compare).not.toHaveBeenCalled()
      expect(auth.generateAccessToken).not.toHaveBeenCalled()
    })

    it('should throw an AppError when the password is incorrect', async () => {
      ;(userRepository.findByEmail as jest.Mock).mockResolvedValue(user)
      ;(compare as jest.Mock).mockResolvedValue(false)

      await expect(loginService.execute(loginData)).rejects.toThrow(
        new AppError('Email ou senha incorretos.', 401)
      )

      expect(compare).toHaveBeenCalledWith(
        loginData.password,
        user.password
      )

      expect(auth.generateAccessToken).not.toHaveBeenCalled()
    })

    it('should reject when the input validation fails', async () => {
      ;(validatorObject as jest.Mock).mockRejectedValueOnce(
        new Error('Dados inválidos')
      )

      await expect(loginService.execute(loginData)).rejects.toThrow(
        'Dados inválidos'
      )

      expect(userRepository.findByEmail).not.toHaveBeenCalled()
      expect(compare).not.toHaveBeenCalled()
    })
  })
})
