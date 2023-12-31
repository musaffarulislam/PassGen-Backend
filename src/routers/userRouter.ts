import express from 'express';
import {registerUser,userLogin,savedPassword,fetchSavedData} from '../controllers/userController'
import verifyUserToken from '../middlewares/autherization'

const router = express.Router()

router.post('/signup',registerUser)

router.post('/login',userLogin)

router.post('/saved-password',verifyUserToken,savedPassword)

router.get('/fetchSavedData',verifyUserToken,fetchSavedData)

export default router;