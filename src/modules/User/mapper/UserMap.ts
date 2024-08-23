import { instanceToInstance } from "class-transformer"
import { User } from "shared/infra/typeorm/entities/Users"
import { IUserResponseDTO } from "../dtos/IUser.dto"

export class UserMap {
  static toDTO({ email, id, name, phone, active, groupUserId }: User): IUserResponseDTO {
    const user = instanceToInstance({
      id,
      name,
      email,
      phone,
      active,
      groupUserId
    })

    delete (user as any).password

    return user
  }
}