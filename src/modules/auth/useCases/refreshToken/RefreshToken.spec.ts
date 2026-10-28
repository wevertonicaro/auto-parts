
import { verify } from 'jsonwebtoken'
import 'reflect-metadata'
import * as auth from '../../../../config/authToken'
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider'
import validatorObject from '../../../../shared/utils/yup/location.validation'
import { IUserTokensRepository } from '../../repositories/IUserTokenRepository'
import { RefreshTokenService } from './RefreshToken.service'

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn()
}))

jest.mock('../../../../config/authToken', () => ({
  secret: 'test-secret',
  generateAccessToken: jest.fn(),
  generateRefreshToken: jest.fn(),
  expiresTokenRefreshTime: 24
}))

jest.mock('../../../../shared/utils/yup/location.validation', () => ({
  __esModule: true,
  default: jest.fn()
}))

describe('RefreshTokenService', () => {
  let refreshTokenService: RefreshTokenService
  let userTokensRepository: IUserTokensRepository
  let dateProvider: IDateProvider

  const refreshToken = 'valid-refresh-token'

  const user = {
    id: 1,
    name: 'Test User',
    email: 'test@email.com'
  }

  const decodedToken = {
    user,
    tokenType: 'refresh'
  }

  const storedToken = {
    id: 10,
    userId: user.id,
    token: refreshToken,
    expiresDate: '2026-12-31 23:59:59',
    updatedAt: new Date('2026-01-01T00:00:00Z')
  }

  beforeEach(() => {
    jest.clearAllMocks()

    userTokensRepository = {
      findByUserId: jest.fn(),
      update: jest.fn()
    } as unknown as IUserTokensRepository

    dateProvider = {
      dateNow: jest.fn().mockReturnValue(
        new Date('2026-10-28T12:00:00Z')
      )
    } as unknown as IDateProvider

    refreshTokenService = new RefreshTokenService(
      userTokensRepository,
      dateProvider
    )

    ;(validatorObject as jest.Mock).mockResolvedValue(undefined)
    ;(verify as jest.Mock).mockReturnValue(decodedToken)

    ;(auth.generateAccessToken as jest.Mock).mockReturnValue(
      'new-access-token'
    )

    ;(auth.generateRefreshToken as jest.Mock).mockReturnValue(
      'new-refresh-token'
    )

    ;(userTokensRepository.findByUserId as jest.Mock).mockResolvedValue({
      ...storedToken
    })

    ;(userTokensRepository.update as jest.Mock).mockResolvedValue(true)
  })

  describe('execute', () => {
    it('should generate new tokens when the refresh token is valid', async () => {
      const result = await refreshTokenService.execute(refreshToken)

      expect(validatorObject).toHaveBeenCalledWith(
        expect.anything(),
        { token: refreshToken }
      )

      expect(verify).toHaveBeenCalledWith(
        refreshToken,
        auth.secret
      )

      expect(userTokensRepository.findByUserId).toHaveBeenCalledWith(
        user.id
      )

      expect(auth.generateAccessToken).toHaveBeenCalledWith(user)
      expect(auth.generateRefreshToken).toHaveBeenCalledWith(user)

      expect(userTokensRepository.update).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: user.id,
          token: 'new-refresh-token',
          expiresDate: expect.any(String),
          updatedAt: expect.any(Date)
        })
      )

      expect(result).toEqual({
        message: 'Token atualizado com sucesso.',
        token: 'new-access-token',
        refresh_token: 'new-refresh-token'
      })
    })

    it('should reject when input validation fails', async () => {
      ;(validatorObject as jest.Mock).mockRejectedValueOnce(
        new Error('Dados inválidos')
      )

      await expect(
        refreshTokenService.execute(refreshToken)
      ).rejects.toThrow('Dados inválidos')

      expect(verify).not.toHaveBeenCalled()
      expect(userTokensRepository.findByUserId).not.toHaveBeenCalled()
    })

    it('should reject when JWT verification fails', async () => {
      ;(verify as jest.Mock).mockImplementationOnce(() => {
        throw new Error('jwt expired')
      })

      await expect(
        refreshTokenService.execute(refreshToken)
      ).rejects.toThrow('jwt expired')

      expect(userTokensRepository.findByUserId).not.toHaveBeenCalled()
    })

    it('should reject a token without a user payload', async () => {
      ;(verify as jest.Mock).mockReturnValueOnce({
        tokenType: 'refresh'
      })

      await expect(
        refreshTokenService.execute(refreshToken)
      ).rejects.toThrow('Refresh token inválido.')

      expect(userTokensRepository.findByUserId).not.toHaveBeenCalled()
    })

    it('should reject a token with the wrong token type', async () => {
      ;(verify as jest.Mock).mockReturnValueOnce({
        user,
        tokenType: 'access'
      })

      await expect(
        refreshTokenService.execute(refreshToken)
      ).rejects.toThrow('Refresh token inválido.')

      expect(userTokensRepository.findByUserId).not.toHaveBeenCalled()
    })

    it('should reject when the token record does not exist', async () => {
      ;(userTokensRepository.findByUserId as jest.Mock).mockResolvedValueOnce(
        null
      )

      await expect(
        refreshTokenService.execute(refreshToken)
      ).rejects.toThrow('Registro de token não encontrado.')

      expect(userTokensRepository.update).not.toHaveBeenCalled()
    })

    it('should reject a token that differs from the stored token', async () => {
      ;(userTokensRepository.findByUserId as jest.Mock).mockResolvedValueOnce({
        ...storedToken,
        token: 'another-refresh-token'
      })

      await expect(
        refreshTokenService.execute(refreshToken)
      ).rejects.toThrow('Refresh token inválido ou revogado.')

      expect(auth.generateAccessToken).not.toHaveBeenCalled()
      expect(userTokensRepository.update).not.toHaveBeenCalled()
    })

    it('should throw an error when updating the token fails', async () => {
      ;(userTokensRepository.update as jest.Mock).mockResolvedValueOnce(
        false
      )

      await expect(
        refreshTokenService.execute(refreshToken)
      ).rejects.toThrow('Não foi possível atualizar o token.')
    })
  })
})
