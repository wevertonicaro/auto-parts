import { Request, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokenService } from "./RefreshToken.service";


export class RefreshTokenController {
  async handler(request: Request, response: Response): Promise<Response> {
    try {
      const token =
        request.body.token ||
        request.headers["x-access-token"] ||
        request.query.token;

      const refreshTokenUseCase = container.resolve(RefreshTokenService);

      const refresh_token = await refreshTokenUseCase.execute(token);

      return response.status(200).json(refresh_token);
    } catch (error) {
      return response.status(401).json({ error: error.message, message: "Token não atualizado." })
    }
  }
}