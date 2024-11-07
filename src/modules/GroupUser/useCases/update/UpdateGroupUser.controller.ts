import { Request, Response } from "express";
import { IUpdateGroupUserDto } from "modules/GroupUser/dtos/GroupUser.dto";
import { container } from "tsyringe";
import { logger } from "../../../../utils/logger";
import { UpdateGroupUserService } from "./UpdateGroupUser.service";

export class UpdateGroupUserController {
  async handler(request: Request, response: Response): Promise<Response> {
    const {id} = request.params
    const data: IUpdateGroupUserDto = request.body

    data.id = Number(id);

    try {
      const updateGroupUserService = container.resolve(UpdateGroupUserService)

      const group = await updateGroupUserService.execute(data)

      logger.info({ message: `Grupo atualizado com sucesso!` })
      return response.status(200).json(group)
    } catch (error) {
      logger.error(error.message)
      return response.status(400).json({ error: error.message })
    }
  }
}