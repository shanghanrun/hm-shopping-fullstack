const express = require('express')
const productRouter = express.Router()
const productController =require('../controller/productController')
const authController =require('../controller/authController')

productRouter.post('/', authController.authenticate, authController.checkAdminPermission, productController.createProduct)
productRouter.get('/', productController.getAllProducts)
productRouter.get('/:id', productController.getProductById)
productRouter.delete('/:id', productController.deleteProduct)
productRouter.put('/:id', productController.updateProduct)

module.exports =productRouter