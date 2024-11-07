import { Router } from "express"
import { ensureAdmin } from "http/middlewares/ensureAdmin"
import { ensureAuth } from "http/middlewares/ensureAuth"
import { CreateUserController } from "modules/User/useCases/create/CreateUser.controller"
import { DeleteUserController } from "modules/User/useCases/delete/DeleteUser.controller"
import { FindUserController } from "modules/User/useCases/find/FindUser.controller"
import { UpdateUserController } from "modules/User/useCases/update/UpdateUser.controller"

const userRouter = Router()
const createUserController = new CreateUserController()
const findUserController = new FindUserController()
const updateUserController = new UpdateUserController()
const deleteUserController = new DeleteUserController()

userRouter.post('/', (request, response) => {createUserController.handler(request, response)})

userRouter.get('/', ensureAuth, (request, response) => {findUserController.handler(request, response)})

userRouter.put('/:id', ensureAuth, (request, response) => {updateUserController.handler(request, response)})

userRouter.delete('/:id', ensureAuth, ensureAdmin, (request, response) => {deleteUserController.handler(request, response)})

export { userRouter }

