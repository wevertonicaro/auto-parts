import { Router } from 'express'
import { CreateGroupUserController } from '../../modules/GroupUser/useCases/create/CreateGroupUser.controller'
import { DeleteGroupUserController } from '../../modules/GroupUser/useCases/delete/DeleteGroupUser.controller'
import { GetGroupUserController } from '../../modules/GroupUser/useCases/find/FindGroupUser.controller'
import { UpdateGroupUserController } from '../../modules/GroupUser/useCases/update/UpdateGroupUser.controller'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuth } from '../middlewares/ensureAuth'
import rateLimiter from '../middlewares/rateLimiter'

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
