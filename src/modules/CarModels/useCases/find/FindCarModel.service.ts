import { inject, injectable } from 'tsyringe'
import { CarModel } from '../../../../shared/infra/typeorm/entities/CarModel'
import { ICarModelRepository } from '../../repositories/ICarModelsRepository'

@injectable()
export class FindCarModelService {
    constructor(
        @inject('CarModelRepository')
        private carModelRepository: ICarModelRepository
    ) {}

    async execute(id?: number, description?: string, carId?: number): Promise<CarModel[]> {
        let carsModels: CarModel[] = []

        if (id) {
            carsModels.push(await this.carModelRepository.findById(id))
        } else if (description && carId) {
            carsModels.push(
                await this.carModelRepository.findByCarIdAndDescription(description, carId)
            )
        } else if (description) {
            carsModels.push(await this.carModelRepository.findByDescription(description))
        } else if (carId) {
            carsModels = await this.carModelRepository.findByCarId(carId)
        } else {
            carsModels = await this.carModelRepository.find()
        }

        return carsModels
    }
}
