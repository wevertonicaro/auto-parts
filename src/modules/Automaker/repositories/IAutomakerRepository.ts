import { Automaker } from '../../../shared/infra/typeorm/entities/Automaker'
import { ICreateAutomakerDto } from '../dtos/Automaker.dto'

export interface IAutomakerRepository {
    create(data: ICreateAutomakerDto): Promise<Automaker>
    find(): Promise<Automaker[]>
    findById(id: number): Promise<Automaker>
    findByDescription(description: string): Promise<Automaker>
    update(id: number, data: any): Promise<Automaker | any>
    delete(id: number): Promise<boolean | string>
}
