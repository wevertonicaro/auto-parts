import { Router } from 'express'
import { ensureAdmin } from '../../../http/middlewares/ensureAdmin'
import { ensureAuth } from '../../../http/middlewares/ensureAuth'
import rateLimiter from '../../../http/middlewares/rateLimiter'
import { CreateGroupUserController } from '../useCases/create/CreateGroupUser.controller'
import { DeleteGroupUserController } from '../useCases/delete/DeleteGroupUser.controller'
import { GetGroupUserController } from '../useCases/find/FindGroupUser.controller'
import { UpdateGroupUserController } from '../useCases/update/UpdateGroupUser.controller'

const groupUserRouter = Router()

const createGroupUserController = new CreateGroupUserController()

const getGroupUserController = new GetGroupUserController()

const updateGroupUserController = new UpdateGroupUserController()

const deleteGroupUserController = new DeleteGroupUserController()

groupUserRouter.use(ensureAuth, rateLimiter)

groupUserRouter.get('/', (request, response) => {
    getGroupUserController.handler(request, response)
})

groupUserRouter.use(ensureAdmin)

groupUserRouter.post('/', (request, response) => {
    createGroupUserController.handler(request, response)
})

groupUserRouter.put('/:id', (request, response) => {
    updateGroupUserController.handler(request, response)
})

groupUserRouter.delete('/:id', (request, response) => {
    deleteGroupUserController.handler(request, response)
})

export { groupUserRouter }
