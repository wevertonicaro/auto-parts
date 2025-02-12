import { inject, injectable } from 'tsyringe'
import { ICarModelRepository } from '../../repositories/ICarModelsRepository'

@injectable()
export class DeleteCarModelService {
    constructor(
        @inject('CarModelRepository')
        private carModelRepository: ICarModelRepository
    ) {}

    async execute(id: number): Promise<boolean | string> {
        try {
            const carModelExists = await this.carModelRepository.findById(id)

            if (!carModelExists) {
                return 'Modelo de veículo não encontrado.'
            }

            await this.carModelRepository.delete(id)

            return true
        } catch (error: any) {
            return error.message
        }
    }
}
