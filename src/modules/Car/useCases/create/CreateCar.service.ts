import { IAutomakerRepository } from 'modules/Automaker/repositories/IAutomakerRepository'
import { ICreateCarDto } from 'modules/Car/dtos/Car.dto'
import { ICarRepository } from 'modules/Car/repositories/ICarRepository'
import { createCarValidator } from 'modules/Car/validator/carValidator'
import { Car } from 'shared/infra/typeorm/entities/Car'
import { inject, injectable } from 'tsyringe'
import AppError from '../../../../http/error/AppError'
import validatorObject from '../../../../utils/yup/location.validation'

@injectable()
export class CreateCarService {
    constructor(
        @inject('CarRepository')
        private carRepository: ICarRepository,

        @inject('AutomakerRepository')
        private automakerRepository: IAutomakerRepository
    ) {}

    async execute(data: ICreateCarDto): Promise<Car> {
        await validatorObject(createCarValidator, data)

        const automakerExists = await this.automakerRepository.findById(data.automakerId)

        if (!automakerExists) throw new AppError('Montadora já existente.')

        const carExists = await this.carRepository.findByDescription(data.description)

        if (carExists) throw new AppError('Veículo já existente.')

        try {
            const createCar = await this.carRepository.create(data)
            return createCar
        } catch (error: any) {
            return error.message
        }
    }
}
