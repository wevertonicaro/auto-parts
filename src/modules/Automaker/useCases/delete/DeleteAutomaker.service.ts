import AppError from "http/error/AppError";
import { IAutomakerRepository } from "modules/Automaker/repositories/IAutomakerRepository";
import { inject, injectable } from "tsyringe";

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