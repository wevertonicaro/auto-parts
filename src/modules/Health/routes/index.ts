
import { Router } from 'express'
import { HealthController } from '../useCases/health.controller'

const healthRouter = Router()
const healthController = new HealthController()

healthRouter.get('/live', async (req, res) => {
    await healthController.liveness(req, res)
})

healthRouter.get('/ready', async (req, res) => {
    await healthController.readiness(req, res)
})

export { healthRouter }

