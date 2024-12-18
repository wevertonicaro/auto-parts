import { Router } from 'express'
import { CreateAutomakerController } from '../../modules/Automaker/useCases/create/CreateAutomaker.controller'
import { DeleteAutomakerController } from '../../modules/Automaker/useCases/delete/DeleteAutomaker.controller'
import { GetAutomakerController } from '../../modules/Automaker/useCases/find/FindAutomaker.controller'
import { UpdateAutomakerController } from '../../modules/Automaker/useCases/update/UpdateAutomaker.controller'
import { upload } from '../../utils/multer/Multer'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuth } from '../middlewares/ensureAuth'
import rateLimiter from '../middlewares/rateLimiter'
import { ImportAutomakerListController } from './../../modules/Automaker/useCases/import/ImportAutomakerList.controller'

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
