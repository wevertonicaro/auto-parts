import { pathAuth } from '../../modules/auth/swagger/Auth.swagger'
import { pathAutomaker } from '../../modules/Automaker/swagger/Automaker.swagger'
import { pathCar } from '../../modules/Car/swagger/Car.swagger'
import { pathGroupUser } from '../../modules/GroupUser/swagger/GroupUser.swagger'
import { pathUser } from '../../modules/User/swagger/User.swagger'

const pathsRepository: Array<Object> = [pathUser, pathGroupUser, pathAuth, pathAutomaker, pathCar]

const paths = {}

for (let tagsArrayPaths of pathsRepository) {
    let objectArrayPath: any = tagsArrayPaths
    for (let path of objectArrayPath) {
        for (let prop in path) {
            // @ts-ignore
            if (paths.hasOwnProperty(prop)) Object.assign(paths[prop], path[prop])
            // @ts-ignore
            else paths[prop] = path[prop]
        }
    }
}

export { paths }
