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

userRouter.post('/', createUserController.handle)

// Rota para buscar usuários
userRouter.get('/', ensureAuth, findUserController.handle)

// Rota para atualizar um usuário
userRouter.put('/:id', ensureAuth, updateUserController.handle)

// Rota para deletar um usuário
userRouter.delete('/:id', ensureAuth, ensureAdmin, deleteUserController.handle)

export { userRouter }
