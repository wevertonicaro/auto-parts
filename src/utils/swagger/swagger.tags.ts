import { tagsAuth } from '../../modules/auth/swagger/Auth.swagger'
import { tagsAutomaker } from '../../modules/Automaker/swagger/Automaker.swagger'
import { tagsCar } from '../../modules/Car/swagger/Car.swagger'
import { tagsCarModel } from '../../modules/CarModels/swagger/CarModels.swagger'
import { tagsGroupUser } from '../../modules/GroupUser/swagger/GroupUser.swagger'
import { tagsUser } from '../../modules/User/swagger/User.swagger'

const tags: Array<Object> = [
    tagsUser,
    tagsGroupUser,
    tagsAuth,
    tagsAutomaker,
    tagsCar,
    tagsCarModel,
]

export { tags }
