import { inject, injectable } from 'tsyringe'
import AppError from '../../../../http/error/AppError'
import { Parts } from '../../../../shared/infra/typeorm/entities/Parts'
import validatorObject from '../../../../shared/utils/yup/location.validation'
import { ICarModelRepository } from '../../../CarModels/repositories/ICarModelsRepository'
import { ICreatePartsDto } from '../../dtos/Parts.dto'
import { IPartsModelsRelationsRepository } from '../../repositories/IPartsModelsRelationsRepository'
import { IPartsRepository } from '../../repositories/IPartsRepository'
import { createPartsValidator } from '../../validator/PartsValidator'

@injectable()
export class CreatePartsService {
    constructor(
        @inject('PartsRepository')
        private partsRepository: IPartsRepository,

        @inject('PartsModelsRelationsRepository')
        private partsModelsRelationsRepository: IPartsModelsRelationsRepository,

        @inject('CarModelRepository')
        private carModelRepository: ICarModelRepository
    ) {}

    async execute(data: ICreatePartsDto): Promise<Parts> {
        await validatorObject(createPartsValidator, data)

        const carModels = data.carModelId

        const partExists = await this.partsRepository.findByCode(data.code)

        if (partExists) throw new AppError('Peça já existente.')

        for (let carModel of carModels) {
            const carModelExists = await this.carModelRepository.findById(carModel)

            if (!carModelExists) throw new AppError('Modelo de veículo não encontrado.')
        }

        try {
            const createParts = await this.partsRepository.create(data)

            if (createParts) {
                for (let carModel of carModels) {
                    await this.partsModelsRelationsRepository.create({
                        carModelId: carModel,
                        partId: createParts.id,
                    })
                }
            }

            return createParts
        } catch (error: any) {
            return error.message
        }
    }
}
