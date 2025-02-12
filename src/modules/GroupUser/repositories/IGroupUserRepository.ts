import { GroupUser } from '../../../shared/infra/typeorm/entities/GroupUsers'
import { ICreateGroupUserDto, IUpdateGroupUserDto } from '../dtos/GroupUser.dto'

export interface IGroupUserRepository {
    create(data: ICreateGroupUserDto): Promise<GroupUser>
    find(): Promise<GroupUser[]>
    findById(id: number): Promise<GroupUser>
    findByDescription(description: string): Promise<GroupUser>
    update(id: number, data: IUpdateGroupUserDto): Promise<GroupUser>
    delete(id: number): Promise<boolean | string>
}
