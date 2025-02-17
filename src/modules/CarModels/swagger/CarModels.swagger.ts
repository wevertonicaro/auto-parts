import {
    createCarModelDefinitions,
    createCarModelPath,
} from '../useCases/createCarModel/CreateCarModel.swagger'
import {
    deleteCarModelDefinitions,
    deleteCarModelPath,
} from '../useCases/deleteCarModel/DeleteCarModel.swagger'
import { getCarModelDefinitions, getCarModelPath } from '../useCases/find/FindCarModel.swagger'

const tagsCarModel = {
    name: 'Modelos de Veículos',
    description:
        'Processos a respeito de criação, busca, atualização e exclusão de modelos de veículos.',
}

const pathCarModel: Array<Object> = [createCarModelPath, deleteCarModelPath, getCarModelPath]

const definitionsCarModel: Array<Object> = [
    createCarModelDefinitions,
    deleteCarModelDefinitions,
    getCarModelDefinitions,
]

export { definitionsCarModel, pathCarModel, tagsCarModel }
