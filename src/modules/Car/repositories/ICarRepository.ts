import { Car } from '../../../shared/infra/typeorm/entities/Car'
import { ICreateCarDto } from '../dtos/Car.dto'

export interface ICarRepository {
    create(data: ICreateCarDto): Promise<Car>
    find(): Promise<Car[]>
    findById(id: number): Promise<Car>
    findByDescription(description: string): Promise<Car>
    findByAutomakerId(automakerId: number): Promise<Car[]>
    findByAutomakerIdAndDescription(description: string, automakerId: number): Promise<Car>
    update(id: number, data: any): Promise<Car | any>
    delete(id: number): Promise<boolean | string>
}
