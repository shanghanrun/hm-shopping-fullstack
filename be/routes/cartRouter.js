const express = require('express')
const router = express.Router()
const cartController =require('../controller/cartController')
const authController =require('../controller/authController')

router.post('/', authController.authenticate, cartController.createCartItem)
router.get('/:id', cartController.getCartList)
router.delete('/:id', cartController.deleteCartItem)
router.put('/:id', cartController.updateItemQty)

module.exports =router