import AppError from "http/error/AppError";
import { ICreateAutomakerDto } from "modules/Automaker/dtos/Automaker.dto";
import { dataBaseConnection } from "shared/infra/typeorm/database/dataSource";
import { Automaker } from "shared/infra/typeorm/entities/Automaker";
import { Repository } from "typeorm";
import { IAutomakerRepository } from "../IAutomakerRepository";

export class AutomakerRepository implements IAutomakerRepository {
  private repository: Repository<Automaker>

  constructor() {
    this.repository = dataBaseConnection.getRepository(Automaker)
  }
  
  async create(data: ICreateAutomakerDto): Promise<Automaker> {
    const createAutomaker = this.repository.create(data)
    return await this.repository.save(createAutomaker)
  }

  async find(): Promise<Automaker[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<Automaker> {
    return await this.repository.findOneBy({id})
  }

  async findByDescription(description: string): Promise<Automaker> {
    return await this.repository.findOneBy({description})
  }

  async update(id: number, data: any): Promise<Automaker | any> {
    const updateResult = await this.repository.update(id, data) 
    if (updateResult.raw.affectedRows < 0) {
      throw new AppError('Atualização não efetuada')
    } else {
      return await this.repository.findOneBy({id})
    }
  }

  async delete(id: number): Promise<boolean | string> {
    const deleteGroupUser = await this.repository.delete(id)
    if (deleteGroupUser.raw.affectedRows <= 0) {
      throw new AppError('Não foi possivel deletar a montadora.')
    }
    return true
  }
}