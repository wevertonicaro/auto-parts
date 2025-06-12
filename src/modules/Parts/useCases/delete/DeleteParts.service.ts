import { inject, injectable } from 'tsyringe'
import { IPartsRepository } from '../../repositories/IPartsRepository'

@injectable()
export class DeletePartsService {
    constructor(
        @inject('PartsRepository')
        private partsRepository: IPartsRepository
    ) {}

    async execute(id: number): Promise<boolean | string> {
        try {
            const partsExists = await this.partsRepository.findById(id)

            if (!partsExists) {
                return 'Peça não encontrado.'
            }

            await this.partsRepository.delete(id)

            return true
        } catch (error: any) {
            return error.message
        }
    }
}
