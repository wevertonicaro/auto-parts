import { PartsModelsRelations } from '../../../shared/infra/typeorm/entities/PartsModelsRelations'
import {
    ICreatePartsModelsRelationsDto,
    IUpdatePartsModelsRelationsDto,
} from '../dtos/PartsModelsRelations.dto'

export interface IPartsModelsRelationsRepository {
    create(data: ICreatePartsModelsRelationsDto): Promise<PartsModelsRelations>
    find(): Promise<PartsModelsRelations[]>
    findById(id: number): Promise<PartsModelsRelations>
    findByCarModelId(carModelId: number): Promise<PartsModelsRelations[]>
    findByPartId(partId: number): Promise<PartsModelsRelations[]>
    findByCarModelIdAndPartId(carModelId: number, partId: number): Promise<PartsModelsRelations[]>
    update(id: number, data: IUpdatePartsModelsRelationsDto): Promise<PartsModelsRelations>
    delete(id: number): Promise<boolean | string>
}
