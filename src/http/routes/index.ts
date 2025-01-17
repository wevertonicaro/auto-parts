import { Router } from 'express'
import { authRouter } from './Auth.routes'
import { automakerRouter } from './AutoMaker'
import { carRouter } from './Car'
import { groupUserRouter } from './GroupUser.routes'
import { userRouter } from './User.routes'

const router = Router()

router.use('/auth', authRouter)

router.use('/users', userRouter)

router.use('/group-users', groupUserRouter)

router.use('/automakers', automakerRouter)

router.use('/cars', carRouter)

export { router }
