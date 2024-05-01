const express = require('express')
const router = express.Router()
const cartController =require('../controller/cartController')
const authController =require('../controller/authController')

router.post('/', authController.authenticate, cartController.createItem)
router.get('/', cartController.getAllItems)
router.delete('/:id', cartController.deleteItem)
router.put('/:id', cartController.updateItemQty)

module.exports =router