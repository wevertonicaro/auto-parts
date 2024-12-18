import { inject, injectable } from 'tsyringe'
import AppError from '../../../../http/error/AppError'
import { ICarRepository } from '../../repositories/ICarRepository'

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
