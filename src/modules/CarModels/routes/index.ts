import { Router } from 'express'
import { ensureAuth } from '../../../http/middlewares/ensureAuth'
import rateLimiter from '../../../http/middlewares/rateLimiter'
import { CreateCarModelController } from '../useCases/create/CreateCarModel.controller'
import { DeleteCarModelController } from '../useCases/delete/DeleteCarModel.controller'
import { FindCarModelController } from '../useCases/find/FindCarModel.controller'
import { UpdateCarModelController } from '../useCases/update/UpdateCarModel.controller'

const createCarModelController = new CreateCarModelController()
const findCarModelController = new FindCarModelController()
const deleteCarModelController = new DeleteCarModelController()
const updateCarModelController = new UpdateCarModelController()

const carModelRoutes = Router()

carModelRoutes.use(ensureAuth, rateLimiter)

carModelRoutes.post('/', (request, response) => {
    createCarModelController.handler(request, response)
})

carModelRoutes.get('/', (request, response) => {
    findCarModelController.handler(request, response)
})

carModelRoutes.put('/:id', (request, response) => {
    updateCarModelController.handler(request, response)
})

carModelRoutes.delete('/:id', (request, response) => {
    deleteCarModelController.handler(request, response)
})

export { carModelRoutes }
