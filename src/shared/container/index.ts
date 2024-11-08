import { UserTokensRepository } from "modules/auth/repositories/implementations/UserToken.repository";
import { IUserTokensRepository } from "modules/auth/repositories/IUserTokenRepository";
import { IAutomakerRepository } from "modules/Automaker/repositories/IAutomakerRepository";
import { AutomakerRepository } from "modules/Automaker/repositories/implementations/AutomakerRepository";
import { IGroupUserRepository } from "modules/GroupUser/repositories/IGroupUserRepository";
import { GroupUserRepository } from "modules/GroupUser/repositories/implementations/GroupUserRepository";
import { UserRepository } from "modules/User/repositories/implementations/UserRepository";
import { IUsersRepository } from "modules/User/repositories/IUserRepository";
import { container } from "tsyringe";
import '../container/providers';

container.registerSingleton<IUsersRepository>('UserRepository', UserRepository)

container.registerSingleton<IGroupUserRepository>('GroupUserRepository', GroupUserRepository)

container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository)

container.registerSingleton<IAutomakerRepository>('AutomakerRepository', AutomakerRepository)