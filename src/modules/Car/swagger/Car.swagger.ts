import { createCarDefinitions, createCarPath } from "../useCases/create/CreateCar.swagger"
import { deleteCarDefinitions, deleteCarPath } from "../useCases/delete/DeleteCar.swagger"
import { getCarDefinitions, getCarPath } from "../useCases/find/FindCar.swagger"
import { updateCarDefinitions, updateCarPath } from "../useCases/update/UpdateCar.swagger"

const tagsCar = {
  name: 'Veículos',
  description: "Processos a respeito de criação, busca, atualização e exclusão de veículos."
}

const pathCar: Array<Object> = [
  createCarPath,
  deleteCarPath,
  getCarPath,
  updateCarPath
]

const definitionsCar: Array<Object> = [
  createCarDefinitions,
  deleteCarDefinitions,
  getCarDefinitions,
  updateCarDefinitions
]

export {
  definitionsCar, pathCar, tagsCar
}
  

  