const Order = require('../model/Order')

const orderController={}

orderController.createOrder = async(req, res)=>{
	try{
		const {shipTo, contact, totalPrice, userId, status, items} = req.body;
		const foundProduct = Product.findOne({_id:items.productId})
		const price = foundProduct.price
		items.price = price

		
		const newOrder = new Order({shipTo, contact,totalPrice,userId, status,items})
		await newOrder.save()
		
		return res.status(200).json({status:'ok', data:newOrder})
	}catch(e){
		return res.status(400).json({status:'fail', e})
	}
}


orderController.getOrder=async(req, res)=>{
	try{
		const orderList = await Order.find()
		res.status(200).json({status:'success', orderList })
	}catch(e){
		res.status(400).json({status:'fail', message:e.message})
	}
}


module.exports = orderController;