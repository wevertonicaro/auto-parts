import { UserTokensRepository } from "modules/auth/repositories/implementations/UserToken.repository";
import { IUserTokensRepository } from "modules/auth/repositories/IUserTokenRepository";
import { IGroupUserRepository } from "modules/GroupUser/repositories/IGroupUserRepository";
import { GroupUserRepository } from "modules/GroupUser/repositories/implementations/GroupUserRepository";
import { UserRepository } from "modules/User/repositories/implementations/UserRepository";
import { IUsersRepository } from "modules/User/repositories/IUserRepository";
import { container } from "tsyringe";
import '../container/providers';

container.registerSingleton<IUsersRepository>('UserRepository', UserRepository)

container.registerSingleton<IGroupUserRepository>('GroupUserRepository', GroupUserRepository)

container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository)