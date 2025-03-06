import { Router } from 'express'
import { CreateCarModelController } from '../../modules/CarModels/useCases/create/CreateCarModel.controller'

const createCarModelController = new CreateCarModelController()

const carModelRoutes = Router()

carModelRoutes.post('/', (request, response) => {
    createCarModelController.handler(request, response)
})

export { carModelRoutes }
