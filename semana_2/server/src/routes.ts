import express from 'express'
import * as ClassesController from './controllers/ClassesController'
import * as ConnectionsController from './controllers/ConnectionsController'


const routes = express.Router()

// classes
routes.post('/classes', ClassesController.create)
routes.get('/classes', ClassesController.list)

// connections
routes.get('/connections', ConnectionsController.totalConnections)
routes.post('/connections', ConnectionsController.create)

export default routes