import { Parts } from '../../../shared/infra/typeorm/entities/Parts'
import { ICreatePartsDto, IUpdatePartsDto } from '../dtos/Parts.dto'

export interface IPartsRepository {
    create(data: ICreatePartsDto): Promise<Parts>
    find(): Promise<Parts[]>
    findById(id: number): Promise<Parts>
    findByDescription(description: string): Promise<Parts>
    findByCode(code: string): Promise<Parts>
    findByCodeAndDescription(code: string, description: string): Promise<Parts>
    findByPrice(price: number): Promise<Parts[]>
    findByQuantity(quantity: number): Promise<Parts[]>
    findByPriceAndQuantity(price: number, quantity: number): Promise<Parts[]>
    update(id: number, data: IUpdatePartsDto): Promise<Parts>
    delete(id: number): Promise<boolean | string>
}
