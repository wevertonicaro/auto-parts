import {
    createCarModelDefinitions,
    createCarModelPath,
} from '../useCases/create/CreateCarModel.swagger'
import {
    deleteCarModelDefinitions,
    deleteCarModelPath,
} from '../useCases/delete/DeleteCarModel.swagger'
import { getCarModelDefinitions, getCarModelPath } from '../useCases/find/FindCarModel.swagger'
import {
    updateCarModelDefinitions,
    updateCarModelPath,
} from '../useCases/update/UpdateCarModel.swagger'

const tagsCarModel = {
    name: 'Modelos de Veículos',
    description:
        'Processos a respeito de criação, busca, atualização e exclusão de modelos de veículos.',
}

const pathCarModel: Array<Object> = [
    createCarModelPath,
    deleteCarModelPath,
    getCarModelPath,
    updateCarModelPath,
]

const definitionsCarModel: Array<Object> = [
    createCarModelDefinitions,
    deleteCarModelDefinitions,
    getCarModelDefinitions,
    updateCarModelDefinitions,
]

export { definitionsCarModel, pathCarModel, tagsCarModel }
