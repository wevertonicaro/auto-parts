import AppError from "http/error/AppError"
import { ICarRepository } from "modules/Car/repositories/ICarRepository"
import { inject, injectable } from "tsyringe"

@injectable()
export class DeleteCarService {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository
  ) {}
  
  async execute(id: number): Promise<boolean | string> {
    const carExists = await this.carRepository.findById(id)

    if (!carExists) {
      throw new AppError('Veículo não encontrado', 404)
    }
    
    const deleteCar = await this.carRepository.delete(id)

    return deleteCar
    
  }
}