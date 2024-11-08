import { IAutomakerRepository } from "modules/Automaker/repositories/IAutomakerRepository";
import { Automaker } from "shared/infra/typeorm/entities/Automaker";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAutomakerService {
  constructor(
    @inject('AutomakerRepository')
    private automakerRepository: IAutomakerRepository
  ) { }

  async execute(id: number, description: string): Promise<Automaker[]> {
    let automakers: Automaker[] = [];

    if (id) {
      automakers.push(await this.automakerRepository.findById(id))
    } else if (description && description !== 'undefined') {
      automakers.push(await this.automakerRepository.findByDescription(description))
    } else {
      automakers = await this.automakerRepository.find()
    }

    return automakers;
  }
}
