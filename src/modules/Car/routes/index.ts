import { Router } from 'express'
import { ensureAdmin } from '../../../http/middlewares/ensureAdmin'
import { ensureAuth } from '../../../http/middlewares/ensureAuth'
import rateLimiter from '../../../http/middlewares/rateLimiter'
import { upload } from '../../../shared/utils/multer/Multer'
import { CreateCarController } from '../useCases/create/CreateCar.controller'
import { DeleteCarController } from '../useCases/delete/DeleteCar.controller'
import { GetCarController } from '../useCases/find/FindCar.controller'
import { ImportCarListController } from '../useCases/import/ImportCarList.controller'
import { UpdateCarController } from '../useCases/update/UpdateCar.controller'

const carRouter = Router()

const createCarController = new CreateCarController()

const getCarController = new GetCarController()

const updateCarController = new UpdateCarController()

const deleteCarController = new DeleteCarController()

const importCarListController = new ImportCarListController()

carRouter.use(ensureAuth, rateLimiter)

carRouter.get('/', (request, response) => {
    getCarController.handler(request, response)
})

carRouter.use(ensureAdmin)

carRouter.post('/', (request, response) => {
    createCarController.handler(request, response)
})

carRouter.put('/:id', (request, response) => {
    updateCarController.handler(request, response)
})

carRouter.delete('/:id', (request, response) => {
    deleteCarController.handler(request, response)
})

carRouter.post('/import', upload.single('file'), async (request, response) => {
    await importCarListController.handler(request, response)
})

export { carRouter }
