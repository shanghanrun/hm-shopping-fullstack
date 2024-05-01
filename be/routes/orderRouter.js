const express = require('express')
const router = express.Router()
const orderController =require('../controller/orderController')

router.post('/', authController.authenticate, cartController.createOrder)
router.get('/', cartController.getOrder)

module.exports =router