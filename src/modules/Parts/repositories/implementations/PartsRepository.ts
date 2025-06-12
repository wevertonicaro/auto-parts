import { Repository } from 'typeorm'
import { dataBaseConnection } from '../../../../shared/infra/typeorm/database/dataSource'
import { Parts } from '../../../../shared/infra/typeorm/entities/Parts'
import { ICreatePartsDto, IUpdatePartsDto } from '../../dtos/Parts.dto'
import { IPartsRepository } from '../IPartsRepository'

export class PartsRepository implements IPartsRepository {
    private repository: Repository<Parts>

    constructor() {
        this.repository = dataBaseConnection.getRepository(Parts)
    }

    async create(data: ICreatePartsDto): Promise<Parts> {
        const parts = this.repository.create(data)
        return await this.repository.save(parts)
    }

    async find(): Promise<Parts[]> {
        return await this.repository.find()
    }

    async findById(id: number): Promise<Parts> {
        const parts = await this.repository.findOneBy({ id })
        return parts
    }

    async findByDescription(description: string): Promise<Parts> {
        const parts = await this.repository.findOneBy({ description })
        return parts
    }

    async findByCode(code: string): Promise<Parts> {
        const parts = await this.repository.findOneBy({ code })
        return parts
    }

    async findByPrice(price: number): Promise<Parts[]> {
        const parts = await this.repository.findBy({ price })
        return parts
    }

    async findByQuantity(quantity: number): Promise<Parts[]> {
        const parts = await this.repository.findBy({ quantity })
        return parts
    }

    async findByPriceAndQuantity(price: number, quantity: number): Promise<Parts[]> {
        const parts = await this.repository.findBy({ price, quantity })
        return parts
    }

    async findByCodeAndDescription(code: string, description: string): Promise<Parts> {
        const parts = await this.repository.findOneBy({ code, description })
        return parts
    }

    async update(id: number, data: IUpdatePartsDto): Promise<Parts> {
        const updateResult = await this.repository.update(id, data)
        if (updateResult.raw.affectedRows < 0) {
            throw new Error('Update not performed')
        } else {
            return await this.repository.findOneBy({ id })
        }
    }

    async delete(id: number): Promise<boolean | string> {
        const deleteParts = await this.repository.delete(id)
        if (deleteParts.raw.affectedRows <= 0) {
            throw new Error('Could not delete the part.')
        }
        return true
    }
}
