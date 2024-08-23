import { createGroupUserDefinitions, createGroupUserPath } from "../useCases/create/CreateGroupUser.swagger"
import { deleteGroupUserDefinitions, deleteGroupUserPath } from "../useCases/delete/DeleteGorupUser.swagger"
import { getGroupUserDefinitions, getGroupUserPath } from "../useCases/find/FindGroupUser.swagger"
import { updateGroupUserDefinitions, updateGroupUserPath } from "../useCases/update/UpdateGroupUser.swagger"

const tagsGroupUser = {
  name: 'Grupo de usuários',
  description: "Processos a respeito de criação, busca, atualização e exclusão de grupo de usuários"
}

const pathGroupUser: Array<Object> = [
  createGroupUserPath,
  deleteGroupUserPath,
  getGroupUserPath,
  updateGroupUserPath
]

const definitionsGroupUser: Array<Object> = [
  createGroupUserDefinitions,
  deleteGroupUserDefinitions,
  getGroupUserDefinitions,
  updateGroupUserDefinitions,
]

export {
  definitionsGroupUser, pathGroupUser, tagsGroupUser
}
  