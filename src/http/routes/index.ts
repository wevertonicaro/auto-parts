import { Router } from 'express'
import { authRouter } from '../../modules/auth/routes'
import { automakerRouter } from '../../modules/Automaker/routes'
import { carRouter } from '../../modules/Car/routes'
import { carModelRoutes } from '../../modules/CarModels/routes'
import { groupUserRouter } from '../../modules/GroupUser/routes'
import { partsRoutes } from '../../modules/Parts/routes'
import { userRouter } from '../../modules/User/routes'

const router = Router()

router.use('/auth', authRouter)

router.use('/users', userRouter)

router.use('/group-users', groupUserRouter)

router.use('/automakers', automakerRouter)

router.use('/cars', carRouter)

router.use('/car-models', carModelRoutes)

router.use('/parts', partsRoutes)

export { router }
