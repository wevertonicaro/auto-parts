import { Router } from 'express'
import { ensureAdmin } from '../../../http/middlewares/ensureAdmin'
import { ensureAuth } from '../../../http/middlewares/ensureAuth'
import rateLimiter from '../../../http/middlewares/rateLimiter'
import { upload } from '../../../shared/utils/multer/Multer'
import { CreateAutomakerController } from '../useCases/create/CreateAutomaker.controller'
import { DeleteAutomakerController } from '../useCases/delete/DeleteAutomaker.controller'
import { GetAutomakerController } from '../useCases/find/FindAutomaker.controller'
import { ImportAutomakerListController } from '../useCases/import/ImportAutomakerList.controller'
import { UpdateAutomakerController } from '../useCases/update/UpdateAutomaker.controller'

const automakerRouter = Router()

const createAutomakerController = new CreateAutomakerController()

const getAutomakerController = new GetAutomakerController()

const updateAutomakerController = new UpdateAutomakerController()

const deleteAutomakerController = new DeleteAutomakerController()

const importAutomakerListController = new ImportAutomakerListController()

automakerRouter.use(ensureAuth, rateLimiter)

automakerRouter.get('/', (request, response) => {
    getAutomakerController.handler(request, response)
})

automakerRouter.use(ensureAdmin)

automakerRouter.post('/', (request, response) => {
    createAutomakerController.handler(request, response)
})

automakerRouter.put('/:id', (request, response) => {
    updateAutomakerController.handler(request, response)
})

automakerRouter.delete('/:id', (request, response) => {
    deleteAutomakerController.handler(request, response)
})

automakerRouter.post('/import', upload.single('file'), async (request, response) => {
    await importAutomakerListController.handler(request, response)
})

export { automakerRouter }
