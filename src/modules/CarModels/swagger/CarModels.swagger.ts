import {
    createCarModelDefinitions,
    createCarModelPath,
} from '../useCases/createCarModel/CreateCarModel.swagger'
import {
    deleteCarModelDefinitions,
    deleteCarModelPath,
} from '../useCases/deleteCarModel/DeleteCarModel.swagger'

const tagsCarModel = {
    name: 'Modelos de Veículos',
    description:
        'Processos a respeito de criação, busca, atualização e exclusão de modelos de veículos.',
}

const pathCarModel: Array<Object> = [createCarModelPath, deleteCarModelPath]

const definitionsCarModel: Array<Object> = [createCarModelDefinitions, deleteCarModelDefinitions]

export { definitionsCarModel, pathCarModel, tagsCarModel }
