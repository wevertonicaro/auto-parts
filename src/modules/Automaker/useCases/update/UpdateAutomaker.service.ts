import AppError from "http/error/AppError"
import { IUpdateAutomakerDto } from "modules/Automaker/dtos/Automaker.dto"
import { IAutomakerRepository } from "modules/Automaker/repositories/IAutomakerRepository"
import { updateAutomakerValidator } from "modules/Automaker/validator/automakerValidator"
import { DayjsDateProvider } from "shared/container/providers/DateProvider/implementations/dayJsDateProvider"
import { Automaker } from "shared/infra/typeorm/entities/Automaker"
import { inject, injectable } from "tsyringe"
import validatorObject from '../../../../utils/yup/location.validation'

@injectable()
export class UpdateAutomakerService {
  constructor(
    @inject('AutomakerRepository')
    private automakerRepository: IAutomakerRepository
  ) { }

  async execute(data: IUpdateAutomakerDto): Promise<Automaker> {
    await validatorObject(updateAutomakerValidator, data)

    const automaker = await this.automakerRepository.findById(data.id)

    if (!automaker) {
      throw new AppError('Montadora não encontrada.', 404)
    }

    automaker.description = data.description ?? undefined
    automaker.updatedAt = new DayjsDateProvider().dateNow()

    const update = await this.automakerRepository.update(automaker.id, automaker)

    return update
  }
}