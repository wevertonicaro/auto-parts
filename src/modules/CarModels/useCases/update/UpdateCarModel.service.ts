import { inject, injectable } from 'tsyringe'
import AppError from '../../../../http/error/AppError'
import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/dayJsDateProvider'
import { CarModel } from '../../../../shared/infra/typeorm/entities/CarModel'
import validatorObject from '../../../../utils/yup/location.validation'
import { ICarRepository } from '../../../Car/repositories/ICarRepository'
import { IUpdateCarModelDto } from '../../dtos/CarModels.dto'
import { ICarModelRepository } from '../../repositories/ICarModelsRepository'
import { updateCarModelValidator } from '../../validator/carModelValidator'

@injectable()
export class UpdateCarModelService {
    constructor(
        @inject('CarModelRepository')
        private carModelRepository: ICarModelRepository,

        @inject('CarRepository')
        private carRepository: ICarRepository
    ) {}

    async execute(data: IUpdateCarModelDto): Promise<CarModel> {
        await validatorObject(updateCarModelValidator, data)

        const carModelExists = await this.carModelRepository.findById(data.id)

        if (!carModelExists) {
            throw new AppError('Modelo de véiculo não encontrada.', 404)
        }

        const carExists = await this.carRepository.findById(data.carId)

        if (!carExists) {
            throw new AppError('Veículo não encontrado.', 404)
        }

        carModelExists.description = data.description ?? undefined
        carModelExists.updatedAt = new DayjsDateProvider().dateNow()

        const update = await this.carModelRepository.update(carModelExists.id, carModelExists)

        return update
    }
}
