import { Router } from 'express'
import { ensureAuth } from '../../../http/middlewares/ensureAuth'
import rateLimiter from '../../../http/middlewares/rateLimiter'
import { CreatePartsController } from '../../Parts/useCases/create/CreateParts.controller'
import { DeletePartsController } from '../../Parts/useCases/delete/DeleteParts.controller'
import { FindPartsController } from '../../Parts/useCases/find/FindParts.controller'
import { UpdatePartsController } from '../../Parts/useCases/update/UpdateParts.controller'

const partsRoutes = Router()

const createPartsController = new CreatePartsController()
const findPartsController = new FindPartsController()
const updatePartsController = new UpdatePartsController()
const deletepartsController = new DeletePartsController()

partsRoutes.use(ensureAuth, rateLimiter)

partsRoutes.post('/', (request, response) => {
    createPartsController.handler(request, response)
})

partsRoutes.get('/', (request, response) => {
    findPartsController.handler(request, response)
})

partsRoutes.put('/:id', (request, response) => {
    updatePartsController.handler(request, response)
})

partsRoutes.delete('/:id', (request, response) => {
    deletepartsController.handler(request, response)
})

export { partsRoutes }
