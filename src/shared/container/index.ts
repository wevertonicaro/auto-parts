import { container } from 'tsyringe'
import { UserTokensRepository } from '../../modules/auth/repositories/implementations/UserToken.repository'
import { IUserTokensRepository } from '../../modules/auth/repositories/IUserTokenRepository'
import { IAutomakerRepository } from '../../modules/Automaker/repositories/IAutomakerRepository'
import { AutomakerRepository } from '../../modules/Automaker/repositories/implementations/AutomakerRepository'
import { ICarRepository } from '../../modules/Car/repositories/ICarRepository'
import { CarRepository } from '../../modules/Car/repositories/implementations/CarRepository'
import { ICarModelRepository } from '../../modules/CarModels/repositories/ICarModelsRepository'
import { CarModelsRepository } from '../../modules/CarModels/repositories/implementations/CarModelsRepository'
import { IGroupUserRepository } from '../../modules/GroupUser/repositories/IGroupUserRepository'
import { GroupUserRepository } from '../../modules/GroupUser/repositories/implementations/GroupUserRepository'
import { PartsModelsRelationsRepository } from '../../modules/Parts/repositories/implementations/PartsModelsRelationsRepository'
import { PartsRepository } from '../../modules/Parts/repositories/implementations/PartsRepository'
import { IPartsModelsRelationsRepository } from '../../modules/Parts/repositories/IPartsModelsRelationsRepository'
import { IPartsRepository } from '../../modules/Parts/repositories/IPartsRepository'
import { UserRepository } from '../../modules/User/repositories/implementations/UserRepository'
import { IUsersRepository } from '../../modules/User/repositories/IUserRepository'
import '../container/providers'

container.registerSingleton<IUsersRepository>('UserRepository', UserRepository)

container.registerSingleton<IGroupUserRepository>('GroupUserRepository', GroupUserRepository)

container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository)

container.registerSingleton<IAutomakerRepository>('AutomakerRepository', AutomakerRepository)

container.registerSingleton<ICarRepository>('CarRepository', CarRepository)

container.registerSingleton<ICarModelRepository>('CarModelRepository', CarModelsRepository)

container.registerSingleton<IPartsRepository>('PartsRepository', PartsRepository)

container.registerSingleton<IPartsModelsRelationsRepository>(
    'PartsModelsRelationsRepository',
    PartsModelsRelationsRepository
)
