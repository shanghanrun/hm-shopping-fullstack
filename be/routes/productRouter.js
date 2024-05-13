const express = require('express')
const productRouter = express.Router()
const productController =require('../controller/productController')
const authController =require('../controller/authController')

productRouter.post('/', authController.authenticate, authController.checkAdminPermission, productController.createProduct)
productRouter.get('/', productController.getProductList)
productRouter.get('/:id', productController.getProductById)
productRouter.delete('/:id', authController.authenticate, authController.checkAdminPermission, productController.deleteProduct)
productRouter.put('/:id', authController.authenticate, authController.checkAdminPermission, productController.updateProduct)

module.exports =productRouter