import { ICreateCarDto } from 'modules/Car/dtos/Car.dto'
import { dataBaseConnection } from 'shared/infra/typeorm/database/dataSource'
import { Car } from 'shared/infra/typeorm/entities/Car'
import { Repository } from 'typeorm'
import AppError from '../../../../http/error/AppError'
import { ICarRepository } from './../ICarRepository'

export class CarRepository implements ICarRepository {
    private repository: Repository<Car>

    constructor() {
        this.repository = dataBaseConnection.getRepository(Car)
    }

    async create(data: ICreateCarDto): Promise<Car> {
        const createCar = this.repository.create(data)
        return await this.repository.save(createCar)
    }

    async find(): Promise<Car[]> {
        return await this.repository.find()
    }

    async findById(id: number): Promise<Car> {
        return await this.repository.findOneBy({ id })
    }

    async findByDescription(description: string): Promise<Car> {
        return await this.repository.findOneBy({ description })
    }

    async findByAutomakerId(automakerId: number): Promise<Car[]> {
        return await this.repository.findBy({ automakerId })
    }

    async findByAutomakerIdAndDescription(description: string, automakerId: number): Promise<Car> {
        return await this.repository.findOneBy({ description, automakerId })
    }

    async update(id: number, data: any): Promise<Car | any> {
        const updateResult = await this.repository.update(id, data)
        if (updateResult.raw.affectedRows < 0) {
            throw new AppError('Atualização não efetuada')
        } else {
            return await this.repository.findOneBy({ id })
        }
    }

    async delete(id: number): Promise<boolean | string> {
        const deleteGroupUser = await this.repository.delete(id)
        if (deleteGroupUser.raw.affectedRows <= 0) {
            throw new AppError('Não foi possivel deletar veículo.')
        }
        return true
    }
}
