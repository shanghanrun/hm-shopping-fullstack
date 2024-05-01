const express = require('express')
const router = express.Router()
const userController =require('../controller/userController')
const authController =require('../controller/authController')

router.post('/', userController.createUser)
router.post('/login', userController.loginWithEmail)
router.get('/me', authController.authenticate, userController.getUser)

module.exports =router