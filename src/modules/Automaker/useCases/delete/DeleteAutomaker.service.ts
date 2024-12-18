import { inject, injectable } from 'tsyringe'
import AppError from '../../../../http/error/AppError'
import { IAutomakerRepository } from '../../repositories/IAutomakerRepository'

@injectable()
export class DeleteAutomakerService {
    constructor(
        @inject('AutomakerRepository')
        private automakerRepository: IAutomakerRepository
    ) {}

    async execute(id: number): Promise<boolean | string> {
        const automakerExists = await this.automakerRepository.findById(id)

        if (!automakerExists) {
            throw new AppError('Montadora não encontrada', 404)
        }

        const deleteAutomaker = await this.automakerRepository.delete(id)

        return deleteAutomaker
    }
}
