const Cart = require('../model/Cart')

const cartController={}

cartController.createItem = async(req, res)=>{
	try{
		const {items} = req.body;
		const userId = req.userId
		
		const newCart = new Cart({userId, items})
		await newCart.save()
		
		return res.status(200).json({status:'ok', data:newCart})
	}catch(e){
		return res.status(400).json({status:'fail', error:e.message})
	}
}


cartController.getAllItems=async(req, res)=>{
	try{
		const cartList = await Cart.find()
		res.status(200).json({status:'success', data:cartList })
	}catch(e){
		res.status(400).json({status:'fail', error:e.message})
	}
}

cartController.deleteItem = async(req,res)=>{
	try{
		const id = req.params.id
		await Cart.delete({_id:id})
		res.status(200).json({status:'ok', message:'A Cart was deleted successfully' })
	}catch(e){
		res.status(400).json({status:'fail', error:e.message})
	}
}

cartController.updateItemQty =async(req,res)=>{
	try{
		const id = req.params.id
		const {qty} = req.body;
		await Cart.updateOne(
			{_id:id},
			{ $set: {qty}}
		)
		const updatedItem = Cart.findOne({_id:id})
		res.status(200).json({status:'ok', data:updatedItem})
	}catch(e){
		res.status(400).json({status:'fail', error:e.message})
	}
}

module.exports = cartController;