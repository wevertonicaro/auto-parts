import { Repository } from 'typeorm'
import AppError from '../../../../http/error/AppError'
import { dataBaseConnection } from '../../../../shared/infra/typeorm/database/dataSource'
import { CarModel } from '../../../../shared/infra/typeorm/entities/CarModel'
import { ICreateCarModelDto, IUpdateCarModelDto } from '../../dtos/CarModels.dto'
import { ICarModelRepository } from '../ICarModelsRepository'

export class CarModelsRepository implements ICarModelRepository {
    private repository: Repository<CarModel>

    constructor() {
        this.repository = dataBaseConnection.getRepository(CarModel)
    }

    async create(data: ICreateCarModelDto): Promise<CarModel> {
        const createCarModel = this.repository.create(data)
        return await this.repository.save(createCarModel)
    }

    async find(): Promise<CarModel[]> {
        return await this.repository.find()
    }

    async findById(id: number): Promise<CarModel> {
        const carModel = await this.repository.findOneBy({ id })
        return carModel
    }

    async findByDescription(description: string): Promise<CarModel> {
        const carModel = await this.repository.findOneBy({ description })
        return carModel
    }

    async findByCarId(carId: number): Promise<CarModel[]> {
        const carModel = await this.repository.findBy({ carId })
        return carModel
    }

    async update(id: number, data: IUpdateCarModelDto): Promise<CarModel> {
        const updateResult = await this.repository.update(id, data)
        if (updateResult.raw.affectedRows < 0) {
            throw new AppError('Atualização não efetuada')
        } else {
            return await this.repository.findOneBy({ id })
        }
    }

    async delete(id: number): Promise<boolean | string> {
        const deleteCarModel = await this.repository.delete(id)
        if (deleteCarModel.raw.affectedRows <= 0) {
            throw new AppError('Não foi possivel deletar o modelo do veículo.')
        }
        return true
    }
}
