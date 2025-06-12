import { inject, injectable } from 'tsyringe'
import AppError from '../../../../http/error/AppError'
import { Car } from '../../../../shared/infra/typeorm/entities/Car'
import validatorObject from '../../../../shared/utils/yup/location.validation'
import { IAutomakerRepository } from '../../../Automaker/repositories/IAutomakerRepository'
import { ICreateCarDto } from '../../dtos/Car.dto'
import { ICarRepository } from '../../repositories/ICarRepository'
import { createCarValidator } from '../../validator/carValidator'

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

        if (!automakerExists) throw new AppError('Montadora não encontrada.', 404)

        const carExists = await this.carRepository.findByDescription(data.description)

        if (carExists) throw new AppError('Veículo já existente.')

        try {
            const createCar = await this.carRepository.create(data)
            return createCar
        } catch (error: any) {
            throw new AppError(`Erro ao criar veículo: ${error.message}`, 500)
        }
    }
}
