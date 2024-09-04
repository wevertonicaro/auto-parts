import { Router } from "express";
import { authRouter } from "./Auth.routes";
import { groupUserRouter } from "./GroupUser.routes";
import { userRouter } from "./User.routes";

const router = Router()

router.use('/users', userRouter)

router.use('/login', authRouter)

router.use('/group-users', groupUserRouter)

export { router };

