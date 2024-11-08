import { createAutomakerDefinitions, createAutomakerPath } from "../useCases/create/CreateAutomaker.swagger"
import { deleteAutomakerDefinitions, deleteAutomakerPath } from "../useCases/delete/DeleteAutomaker.swagger"
import { getAutomakerDefinitions, getAutomakerPath } from "../useCases/find/FindAutomaker.swagger"
import { updateAutomakerDefinitions, updateAutomakerPath } from "../useCases/update/UpdateAutomaker.swagger"

const tagsAutomaker = {
  name: 'Montadoras',
  description: "Processos a respeito de criação, busca, atualização e exclusão de montadoras."
}

const pathAutomaker: Array<Object> = [
  createAutomakerPath,
  deleteAutomakerPath,
  getAutomakerPath,
  updateAutomakerPath
]

const definitionsAutomaker: Array<Object> = [
  createAutomakerDefinitions,
  deleteAutomakerDefinitions,
  getAutomakerDefinitions,
  updateAutomakerDefinitions
]

export {
  definitionsAutomaker, pathAutomaker, tagsAutomaker
}

