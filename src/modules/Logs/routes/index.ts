import { Router } from 'express'
import { LogsController } from '../useCase/logs.controller'

const logsRouter = Router()
const logController = new LogsController()

logsRouter.get('/', (request, response) => {
    logController.getLogs(request, response)
})

export { logsRouter }
