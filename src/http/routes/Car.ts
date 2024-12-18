import { Router } from 'express'
import { CreateCarController } from '../../modules/Car/useCases/create/CreateCar.controller'
import { DeleteCarController } from '../../modules/Car/useCases/delete/DeleteCar.controller'
import { GetCarController } from '../../modules/Car/useCases/find/FindCar.controller'
import { ImportCarListController } from '../../modules/Car/useCases/import/ImportCarList.controller'
import { UpdateCarController } from '../../modules/Car/useCases/update/UpdateCar.controller'
import { upload } from '../../utils/multer/Multer'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuth } from '../middlewares/ensureAuth'
import rateLimiter from '../middlewares/rateLimiter'

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
