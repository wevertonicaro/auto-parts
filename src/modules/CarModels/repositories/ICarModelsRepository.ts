import { CarModel } from '../../../shared/infra/typeorm/entities/CarModel'
import { ICreateCarModelDto, IUpdateCarModelDto } from '../dtos/CarModels.dto'

export interface ICarModelRepository {
    create(data: ICreateCarModelDto): Promise<CarModel>
    find(): Promise<CarModel[]>
    findById(id: number): Promise<CarModel>
    findByDescription(description: string): Promise<CarModel>
    findByCarId(carId: number): Promise<CarModel[]>
    findByCarIdAndDescription(description: string, carId: number): Promise<CarModel>
    update(id: number, data: IUpdateCarModelDto): Promise<CarModel>
    delete(id: number): Promise<boolean | string>
}
