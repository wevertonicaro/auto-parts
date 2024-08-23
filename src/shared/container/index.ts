import { IGroupUserRepository } from "modules/GroupUser/repositories/IGroupUserRepository";
import { GroupUserRepository } from "modules/GroupUser/repositories/implementations/GroupUserRepository";
import { UserRepository } from "modules/User/repositories/implementations/UserRepository";
import { IUsersRepository } from "modules/User/repositories/IUserRepository";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>('UserRepository', UserRepository)

container.registerSingleton<IGroupUserRepository>('GroupUserRepository', GroupUserRepository)