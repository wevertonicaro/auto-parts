import { inject, injectable } from 'tsyringe'
import AppError from '../../../../http/error/AppError'
import { Parts } from '../../../../shared/infra/typeorm/entities/Parts'
import { IPartsRepository } from '../../repositories/IPartsRepository'

@injectable()
export class FindPartsService {
    constructor(
        @inject('PartsRepository')
        private partsRepository: IPartsRepository
    ) {}

    async execute(
        id?: number,
        description?: string,
        code?: string,
        price?: number,
        quantity?: number
    ): Promise<Parts[]> {
        let parts: Parts[] = []

        if (id) {
            const part = await this.partsRepository.findById(id)
            if (!part) throw new AppError('Peça não encontrada para o ID informado.', 404)
            parts.push(part)
        } else if (code && description) {
            const part = await this.partsRepository.findByCodeAndDescription(code, description)
            if (!part)
                throw new AppError('Peça não encontrada para o código e descrição informados.', 404)
            parts.push(part)
        } else if (code) {
            const part = await this.partsRepository.findByCode(code)
            if (!part) throw new AppError('Peça não encontrada para o código informado.', 404)
            parts.push(part)
        } else if (description) {
            const part = await this.partsRepository.findByDescription(description)
            if (!part) throw new AppError('Peça não encontrada para a descrição informada.', 404)
            parts.push(part)
        } else if (price && quantity) {
            parts = await this.partsRepository.findByPriceAndQuantity(price, quantity)
            if (parts.length === 0)
                throw new AppError(
                    'Nenhuma peça encontrada para o preço e quantidade informados.',
                    404
                )
        } else if (price) {
            parts = await this.partsRepository.findByPrice(price)
            if (parts.length === 0)
                throw new AppError('Nenhuma peça encontrada para o preço informado.', 404)
        } else if (quantity) {
            parts = await this.partsRepository.findByQuantity(quantity)
            if (parts.length === 0)
                throw new AppError('Nenhuma peça encontrada para a quantidade informada.', 404)
        } else {
            parts = await this.partsRepository.find()
        }
        return parts
    }
}
