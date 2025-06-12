import { inject, injectable } from 'tsyringe'
import AppError from '../../../../http/error/AppError'
import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/dayJsDateProvider'
import { Car } from '../../../../shared/infra/typeorm/entities/Car'
import validatorObject from '../../../../shared/utils/yup/location.validation'
import { IAutomakerRepository } from '../../../Automaker/repositories/IAutomakerRepository'
import { IUpdateCarDto } from '../../dtos/Car.dto'
import { ICarRepository } from '../../repositories/ICarRepository'
import { updateCarValidator } from '../../validator/carValidator'

@injectable()
export class UpdateCarService {
    constructor(
        @inject('CarRepository')
        private carRepository: ICarRepository,

        @inject('AutomakerRepository')
        private automakerRepository: IAutomakerRepository
    ) {}

    async execute(data: IUpdateCarDto): Promise<Car> {
        await validatorObject(updateCarValidator, data)

        const car = await this.carRepository.findById(data.id)

        if (!car) {
            throw new AppError('Veículo não encontrado.', 404)
        }

        const automakerExists = await this.automakerRepository.findById(data.automakerId)

        if (!automakerExists) {
            throw new AppError('Montadora não encontrada.', 404)
        }

        car.description = data.description ?? undefined
        car.updatedAt = new DayjsDateProvider().dateNow()

        const update = await this.carRepository.update(car.id, car)

        return update
    }
}
