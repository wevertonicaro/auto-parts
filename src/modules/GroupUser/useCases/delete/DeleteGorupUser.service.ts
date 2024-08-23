import AppError from "http/error/AppError"
import { IGroupUserRepository } from "modules/GroupUser/repositories/IGroupUserRepository"
import { inject, injectable } from "tsyringe"

@injectable()
export class DeleteGroupUserService {
  constructor(
    @inject('GroupUserRepository')
    private groupUserRepository: IGroupUserRepository
  ) { }

  async execute(id: number): Promise<boolean | string> {
    const groupUser = await this.groupUserRepository.findById(id)

    if (!groupUser) {
      throw new AppError('Organização não encontrada.', 404)
    } else {
      const deleteGroupUser = await this.groupUserRepository.delete(id)

      return deleteGroupUser
    }
  }
}