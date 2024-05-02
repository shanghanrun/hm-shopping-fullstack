const express = require('express')
const router = express.Router()
const userController =require('../controller/userController')
const authController =require('../controller/authController')


router.get('/', authController.authenticate, userController.getUser)

module.exports =router