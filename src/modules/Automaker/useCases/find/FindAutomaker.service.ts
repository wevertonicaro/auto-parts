import AppError from 'http/error/AppError'
import { IAutomakerRepository } from 'modules/Automaker/repositories/IAutomakerRepository'
import { Automaker } from 'shared/infra/typeorm/entities/Automaker'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetAutomakerService {
    constructor(
        @inject('AutomakerRepository')
        private automakerRepository: IAutomakerRepository
    ) {}

    async execute(id?: number, description?: string): Promise<Automaker[]> {
        let automakers: Automaker[] = []

        try {
            if (id) {
                const automaker = await this.automakerRepository.findById(id)
                if (automaker) {
                    automakers.push(automaker)
                }
            } else if (description) {
                const automaker = await this.automakerRepository.findByDescription(description)
                if (automaker) {
                    automakers.push(automaker)
                }
            } else {
                automakers = await this.automakerRepository.find()
            }

            if (automakers.length === 0) {
                throw new AppError(
                    'Nenhuma montadora encontrada para os critérios fornecidos.',
                    404
                )
            }

            return automakers
        } catch (error) {
            throw new AppError(error.message || 'Erro ao buscar montadoras.', 500)
        }
    }
}
