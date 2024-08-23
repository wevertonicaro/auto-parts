import { createUserDefinitions, createUserPath } from "../useCases/create/CreateUser.swagger"
import { deleteUserDefinitions, deleteUserPath } from "../useCases/delete/DeleteUser.swagger"
import { findUserDefinitions, findUserPath } from "../useCases/find/FindUser.swagger"
import { putUserDefinitions, putUserPath } from "../useCases/update/UpdateUser.swagger"

const tagsUser = {
  name: 'Usuários',
  description: "Processos a respeito de criação, busca, atualização e exclusão de usuários"
}

const pathUser: Array<Object> = [
  createUserPath,
  deleteUserPath,
  findUserPath,
  putUserPath
]

const definitionsUser: Array<Object> = [
  createUserDefinitions,
  deleteUserDefinitions,
  findUserDefinitions,
  putUserDefinitions, 
]

export {
  definitionsUser, pathUser, tagsUser
}
