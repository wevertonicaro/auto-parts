import { Router } from "express";
import { ensureAdmin } from "http/middlewares/ensureAdmin";
import { ensureAuth } from "http/middlewares/ensureAuth";
import { CreateGroupUserController } from "modules/GroupUser/useCases/create/CreateGroupUser.controller";
import { DeleteGroupUserController } from "modules/GroupUser/useCases/delete/DeleteGorupUser.controller";
import { GetGroupUserController } from "modules/GroupUser/useCases/find/FindGroupUser.controller";
import { UpdateGroupUserController } from "modules/GroupUser/useCases/update/UpdateGroupUser.controller";

const groupUserRouter = Router()

const createGroupUserController = new CreateGroupUserController()

const getGroupUserController = new GetGroupUserController()

const updateGroupUserController = new UpdateGroupUserController()

const deleteGroupUserController = new DeleteGroupUserController()

groupUserRouter.use(ensureAuth, ensureAdmin)

groupUserRouter.post('/', (request, response) => {createGroupUserController.handler(request, response)})

groupUserRouter.get('/',(request, response) => { getGroupUserController.handler(request, response)})

groupUserRouter.put('/:id', (request, response) => { updateGroupUserController.handler(request, response)})

groupUserRouter.delete('/:id', (request, response) => {  deleteGroupUserController.handler(request, response)})

export { groupUserRouter };

