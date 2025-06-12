import { inject, injectable } from 'tsyringe'
import AppError from '../../../../http/error/AppError'
import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/dayJsDateProvider'
import { Parts } from '../../../../shared/infra/typeorm/entities/Parts'
import validatorObject from '../../../../shared/utils/yup/location.validation'
import { IUpdatePartsDto } from '../../dtos/Parts.dto'
import { IPartsRepository } from '../../repositories/IPartsRepository'
import { updatePartsValidator } from '../../validator/PartsValidator'

@injectable()
export class UpdatePartsService {
    constructor(
        @inject('PartsRepository')
        private partsRepository: IPartsRepository
    ) {}

    async execute(data: IUpdatePartsDto): Promise<Parts> {
        await validatorObject(updatePartsValidator, data)

        const partExists = await this.partsRepository.findById(data.id)

        if (!partExists) {
            throw new AppError('Peça não encontrada.', 404)
        }

        if (data.description) {
            const partDescriptionExists = await this.partsRepository.findByDescription(
                data.description
            )

            if (partDescriptionExists && partDescriptionExists.id !== partExists.id) {
                throw new AppError('Descrição já cadastrada.', 409)
            }

            partExists.description = data.description || partExists.description
        }

        if (data.code) {
            const partCodeExists = await this.partsRepository.findByCode(data.code)

            if (partCodeExists && partCodeExists.id !== partExists.id) {
                throw new AppError('Código já cadastrado.', 409)
            }

            partExists.code = data.code || partExists.code
        }

        partExists.price = data.price || partExists.price
        partExists.quantity = data.quantity || partExists.quantity

        partExists.updatedAt = new DayjsDateProvider().dateNow()

        const update = await this.partsRepository.update(partExists.id, partExists)

        return update
    }
}
