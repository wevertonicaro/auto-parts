import { ICarRepository } from "modules/Car/repositories/ICarRepository";
import { Car } from "shared/infra/typeorm/entities/Car";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetCarService {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository
  ) { }

  async execute(id?: number, description?: string, automakerId?: number): Promise<Car[]> {
    let cars: Car[] = [];

    if (id) {
      cars.push(await this.carRepository.findById(id))
    } else if (description && automakerId) {
      cars.push(await this.carRepository.findByAutomakerIdAndDescription(description, automakerId))
    } else if (description) {
      cars.push(await this.carRepository.findByDescription(description))
    } else if (automakerId) {
      cars = await this.carRepository.findByAutomakerId(automakerId)
    } else {
      cars = await this.carRepository.find()
    }

    return cars;
  }
}
