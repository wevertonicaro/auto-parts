import { User } from "shared/infra/typeorm/entities/Users";
import { ICreateUserDTO, IUpdateUserDTO } from "../dtos/IUser.dto";

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User | undefined>
  find(): Promise<User[] | undefined>
  findByEmail(email: string): Promise<User | undefined>
  findById(id: number): Promise<User | undefined> 
  update(data: IUpdateUserDTO): Promise<void>
  delete(id: number): Promise<void>
}