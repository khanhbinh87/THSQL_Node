import express from 'express'

import apiController from '../controller/apiController'
import useController from '../controller/useController'
const router = express.Router()

const initApiRoutes = (app) => {


  router.get('/test-api',apiController.testApi)
  router.post('/register',apiController.handleRegister)
  router.get('/register',apiController.handleRegister)
  router.post('/login',apiController.handleLogin)

  router.get('/user/read',useController.readFunc)
  router.get('/user/create',useController.createFunc)
  router.get('/user/update',useController.updateFunc)
  router.get('/user/delete',useController.deleteFunc)

  return app.use('/api/v1', router)
}
export default initApiRoutes
