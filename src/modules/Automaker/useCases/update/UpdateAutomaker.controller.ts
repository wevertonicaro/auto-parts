import { Request, Response } from "express";
import { IUpdateAutomakerDto } from "modules/Automaker/dtos/Automaker.dto";
import { container } from "tsyringe";
import { logger } from "../../../../utils/logger";
import { UpdateAutomakerService } from "./UpdateAutomaker.service";

export class UpdateAutomakerController {
  async handler(request: Request, response: Response): Promise<Response> {
    const {id} = request.params
    const data: IUpdateAutomakerDto = request.body

    data.id = Number(id);

    try {
      const updateAutomakerService = container.resolve(UpdateAutomakerService)

      const automaker = await updateAutomakerService.execute(data)

      logger.info({ message: `Montadora atualizada com sucesso!` })
      return response.status(200).json(automaker)
    } catch (error) {
      logger.error(error.message)
      return response.status(400).json({ error: error.message })
    }
  }
}