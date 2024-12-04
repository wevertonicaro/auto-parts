import { ICreateAutomakerDto } from 'modules/Automaker/dtos/Automaker.dto'
import { IAutomakerRepository } from 'modules/Automaker/repositories/IAutomakerRepository'
import { createAutomakerValidator } from 'modules/Automaker/validator/automakerValidator'
import { Automaker } from 'shared/infra/typeorm/entities/Automaker'
import { inject, injectable } from 'tsyringe'
import AppError from '../../../../http/error/AppError'
import validatorObject from '../../../../utils/yup/location.validation'

@injectable()
export class CreateAutomakerService {
    constructor(
        @inject('AutomakerRepository')
        private automakerRepository: IAutomakerRepository
    ) {}

    async execute(data: ICreateAutomakerDto): Promise<Automaker> {
        await validatorObject(createAutomakerValidator, data)

        const automakerExists = await this.automakerRepository.findByDescription(data.description)

        if (automakerExists) throw new AppError('Montadora já existente.')

        try {
            const createAutomaker = await this.automakerRepository.create(data)
            return createAutomaker
        } catch (error: any) {
            return error.message
        }
    }
}
