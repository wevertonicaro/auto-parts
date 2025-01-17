import { User } from '../../../shared/infra/typeorm/entities/Users'
import { ICreateUserDTO, IUpdateUserDTO } from '../dtos/IUser.dto'

export interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<User | undefined>
    find(): Promise<User[] | undefined>
    findByEmail(email: string): Promise<User | undefined>
    findById(id: number): Promise<User | undefined>
    findByName(name: string): Promise<User | undefined>
    update(data: IUpdateUserDTO): Promise<User | undefined>
    delete(id: number): Promise<void>
}
