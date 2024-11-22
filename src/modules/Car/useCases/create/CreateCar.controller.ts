import { Request, Response } from "express";
import { ICreateCarDto } from "modules/Car/dtos/Car.dto";
import { container } from "tsyringe";
import { logger } from "../../../../utils/logger";
import { CreateCarService } from "./CreateCar.service";

export class CreateCarController {
  async handler(request: Request, response: Response): Promise<Response> {
    const data: ICreateCarDto = request.body
    try {
      const createCarService = container.resolve(CreateCarService)

      const car = await createCarService.execute(data)

      logger.info({ message: 'Grupo criado com sucesso!' })
      return response.status(201).json(car)
    } catch (error) {
      logger.error(error.message)
      return response.status(400).json({ error: error.message })
    }
  }
}