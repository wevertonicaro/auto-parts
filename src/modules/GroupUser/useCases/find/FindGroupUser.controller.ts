import { Request, Response } from "express";
import { container } from "tsyringe";
import { logger } from "../../../../utils/logger";
import { GetGroupUserService } from "./FindGroupUser.service";

export class GetGroupUserController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { id, descricao } = request.query
    try {
      const getGroupUserService = container.resolve(GetGroupUserService)

      const description = String(descricao)

      const group = await getGroupUserService.execute(Number(id), description)

      logger.info({ message: `Grupo(s) encontrada(s) com sucesso!` })
      return response.status(200).json(group)
    } catch (error) {
      logger.error(error.message)
      return response.status(400).json({ error: error.message })
    }
  }
}