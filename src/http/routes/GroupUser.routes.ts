import { Router } from "express";
import { CreateGroupUserController } from "modules/GroupUser/useCases/create/CreateGroupUser.controller";
import { DeleteGroupUserController } from "modules/GroupUser/useCases/delete/DeleteGorupUser.controller";
import { GetGroupUserController } from "modules/GroupUser/useCases/find/FindGroupUser.controller";
import { UpdateGroupUserController } from "modules/GroupUser/useCases/update/UpdateGroupUser.controller";

const groupUserRouter = Router()

const createGroupUserController = new CreateGroupUserController()

const getGroupUserController = new GetGroupUserController()

const updateGroupUserController = new UpdateGroupUserController()

const deleteGroupUserController = new DeleteGroupUserController()

groupUserRouter.post('/', createGroupUserController.handler)

groupUserRouter.get('/', getGroupUserController.handler)

groupUserRouter.put('/:id', updateGroupUserController.handler)

groupUserRouter.delete('/:id', deleteGroupUserController.handler)

export { groupUserRouter };

