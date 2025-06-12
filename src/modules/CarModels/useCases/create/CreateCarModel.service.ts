import { inject, injectable } from 'tsyringe'
import AppError from '../../../../http/error/AppError'
import { CarModel } from '../../../../shared/infra/typeorm/entities/CarModel'
import validatorObject from '../../../../shared/utils/yup/location.validation'
import { ICarRepository } from '../../../Car/repositories/ICarRepository'
import { ICreateCarModelDto } from '../../dtos/CarModels.dto'
import { ICarModelRepository } from '../../repositories/ICarModelsRepository'
import { createCarModelValidator } from '../../validator/carModelValidator'

@injectable()
export class CreateCarModelService {
    constructor(
        @inject('CarModelRepository')
        private carModelRepository: ICarModelRepository,

        @inject('CarRepository')
        private carRepository: ICarRepository
    ) {}

    async execute(data: ICreateCarModelDto): Promise<CarModel> {
        await validatorObject(createCarModelValidator, data)

        const carExists = await this.carRepository.findById(data.carId)

        if (!carExists) throw new AppError('Carro não encontrado.')

        const carModelExists = await this.carModelRepository.findByDescription(data.description)

        if (carModelExists) throw new AppError('Modelo já existente.')

        try {
            const createCarModel = await this.carModelRepository.create(data)
            return createCarModel
        } catch (error: any) {
            return error.message
        }
    }
}
