import { createCarDefinitions, createCarPath } from '../useCases/create/CreateCar.swagger'
import { deleteCarDefinitions, deleteCarPath } from '../useCases/delete/DeleteCar.swagger'
import { getCarDefinitions, getCarPath } from '../useCases/find/FindCar.swagger'
import { importCarDefinitions, importCarPath } from '../useCases/import/ImportCarList.swagger'
import { updateCarDefinitions, updateCarPath } from '../useCases/update/UpdateCar.swagger'

const tagsCar = {
    name: 'Veículos',
    description: 'Processos a respeito de criação, busca, atualização e exclusão de veículos.',
}

const pathCar: Array<Object> = [
    createCarPath,
    deleteCarPath,
    getCarPath,
    updateCarPath,
    importCarPath,
]

const definitionsCar: Array<Object> = [
    createCarDefinitions,
    deleteCarDefinitions,
    getCarDefinitions,
    updateCarDefinitions,
    importCarDefinitions,
]

export { definitionsCar, pathCar, tagsCar }
