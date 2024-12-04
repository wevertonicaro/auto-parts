import { IUpdateCarDto } from 'modules/Car/dtos/Car.dto'
import { ICarRepository } from 'modules/Car/repositories/ICarRepository'
import { updateCarValidator } from 'modules/Car/validator/carValidator'
import { DayjsDateProvider } from 'shared/container/providers/DateProvider/implementations/dayJsDateProvider'
import { Car } from 'shared/infra/typeorm/entities/Car'
import { inject, injectable } from 'tsyringe'
import AppError from '../../../../http/error/AppError'
import validatorObject from '../../../../utils/yup/location.validation'

@injectable()
export class UpdateCarService {
    constructor(
        @inject('CarRepository')
        private CarRepository: ICarRepository
    ) {}

    async execute(data: IUpdateCarDto): Promise<Car> {
        await validatorObject(updateCarValidator, data)

        const car = await this.CarRepository.findById(data.id)

        if (!car) {
            throw new AppError('Montadora não encontrada.', 404)
        }

        car.description = data.description ?? undefined
        car.updatedAt = new DayjsDateProvider().dateNow()

        const update = await this.CarRepository.update(car.id, car)

        return update
    }
}
