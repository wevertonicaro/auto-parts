import { Repository } from 'typeorm'
import { dataBaseConnection } from '../../../../shared/infra/typeorm/database/dataSource'
import { PartsModelsRelations } from '../../../../shared/infra/typeorm/entities/PartsModelsRelations'
import {
    ICreatePartsModelsRelationsDto,
    IUpdatePartsModelsRelationsDto,
} from '../../dtos/PartsModelsRelations.dto'
import { IPartsModelsRelationsRepository } from '../IPartsModelsRelationsRepository'

export class PartsModelsRelationsRepository implements IPartsModelsRelationsRepository {
    private repository: Repository<PartsModelsRelations>

    constructor() {
        this.repository = dataBaseConnection.getRepository(PartsModelsRelations)
    }

    async create(data: ICreatePartsModelsRelationsDto): Promise<PartsModelsRelations> {
        const partsModelsRelations = this.repository.create(data)
        return await this.repository.save(partsModelsRelations)
    }

    async find(): Promise<PartsModelsRelations[]> {
        return await this.repository.find()
    }

    async findById(id: number): Promise<PartsModelsRelations> {
        const partsModelsRelations = await this.repository.findOneBy({ id })
        return partsModelsRelations
    }

    async findByCarModelId(carModelId: number): Promise<PartsModelsRelations[]> {
        const partsModelsRelations = await this.repository.findBy({ carModelId })
        return partsModelsRelations
    }

    async findByPartId(partId: number): Promise<PartsModelsRelations[]> {
        const partsModelsRelations = await this.repository.findBy({ partId })
        return partsModelsRelations
    }

    async findByCarModelIdAndPartId(
        carModelId: number,
        partId: number
    ): Promise<PartsModelsRelations[]> {
        return await this.repository.findBy({ carModelId, partId })
    }

    async update(id: number, data: IUpdatePartsModelsRelationsDto): Promise<PartsModelsRelations> {
        const updateResult = await this.repository.update(id, data)
        if (updateResult.raw.affectedRows < 0) {
            throw new Error('Update not performed')
        } else {
            return await this.repository.findOneBy({ id })
        }
    }

    async delete(id: number): Promise<boolean | string> {
        const deletePartsModelsRelations = await this.repository.delete(id)
        if (deletePartsModelsRelations.raw.affectedRows <= 0) {
            throw new Error('Unable to delete the part model relation.')
        }
        return true
    }
}
