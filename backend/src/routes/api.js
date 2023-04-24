import express from 'express'

import apiController from '../controller/apiController'
import useController from '../controller/useController'
import groupController from '../controller/groupController'
import { checkUserJWT, checkUserPermission } from '../middleware/JWTActions'
import roleController from '../controller/roleController'
const router = express.Router()

const initApiRoutes = (app) => {

    router.all('*', checkUserJWT, checkUserPermission)

    
    router.post('/register', apiController.handleRegister)
   
    router.post('/login', apiController.handleLogin)
    router.post('/logout', apiController.handleLogout)

    router.get('/account', useController.getUserAccount)
    
    //user routes
    router.get('/user/read', useController.readFunc)
    router.post('/user/create', useController.createFunc)
    router.put('/user/update', useController.updateFunc)
    router.delete('/user/delete', useController.deleteFunc)


    //role routes
    router.get('/role/read', roleController.readFunc)
    router.post('/role/create', roleController.createFunc)
    router.put('/role/update', roleController.updateFunc)
    router.delete('/role/delete', roleController.deleteFunc)
    router.get('/role/by-group/:groupId', roleController.getGroupById)
    router.post('/role/assign-group', roleController.assignRoleToGroup)

    //group routes
    router.get('/group/read', groupController.readFunc)

    return app.use('/api/v1', router)
}
export default initApiRoutes
