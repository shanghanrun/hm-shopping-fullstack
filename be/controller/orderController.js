const Order = require('../model/Order')
const { randomStringGenerator } = require('../utils/randomStringGenerator')
const productController = require('./productController')
const cartController = require('./cartController')

const orderController={}

orderController.createOrder = async(req, res)=>{
	try{
		const userId = req.userId
		const {shipTo, contact, totalPrice, items} = req.body;
		// 재고확인 & 재고 업데이트
		const insufficientStockItems = await productController.checkItemsStock(items)

		// 재고가 충분하지 않은 아이템이 있으면 -> 에러
		if(insufficientStockItems.length >0){
			const errorMessage = insufficientStockItems.reduce((total, item)=> total += `${item.message} \n;`, '')
			throw new Error(errorMessage)
		}
		const orderNum = randomStringGenerator()
		const newOrder = new Order({
			userId, shipTo, contact,totalPrice, items,
			orderNum: orderNum,
		})
		await newOrder.save()
		//save후에 cart를 비워준다.
		// cartController.emptyCart() 
		// // await로 기다리게 하지 않고 비동기로 작업하게 놔둘수도 있지만, 
		// //제대로 비워줘야 화면에 반영되므로 await을 사용한다.

		return res.status(200).json({status:'ok', orderNum: orderNum})
	}catch(e){
		return res.status(400).json({status:'fail', error:e.message})
	}
}


orderController.getOrder=async(req, res)=>{
	try{
		const orderList = await Order.find()
		res.status(200).json({status:'success', data: orderList })
	}catch(e){
		res.status(400).json({status:'fail', error:e.message})
	}
}


module.exports = orderController;