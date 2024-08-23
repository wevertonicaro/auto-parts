import { IGroupUserRepository } from "modules/GroupUser/repositories/IGroupUserRepository"
import { GroupUser } from "shared/infra/typeorm/entities/GroupUsers"
import { inject, injectable } from "tsyringe"

@injectable()
export class GetGroupUserService {
  constructor(
    @inject('GroupUserRepository')
    private groupUserRepository: IGroupUserRepository
  ) { }

  async execute(id: number, description: string): Promise<GroupUser[]> {
    let groupUsers: GroupUser[] = []

    if (id) {
      groupUsers.push(await this.groupUserRepository.findById(id))
    } else if (description) {
      groupUsers.push(await this.groupUserRepository.findByDescription(description))
    } else {
      groupUsers = await this.groupUserRepository.find()
    }
    return groupUsers
  }
}