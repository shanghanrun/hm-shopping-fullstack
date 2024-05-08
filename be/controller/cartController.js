const Cart = require('../model/Cart')
const Product = require('../model/Product')

const cartController={}

cartController.createCartItem = async(req, res)=>{
	try{
		const {id, size} = req.body;
		const userId = req.userId
		// const product = await Product.findById(id)
		
		const newCartItem = new Cart({
			userId, 
			items:[
				{
					productId: id,
					size
				}
			]
		})
		await newCartItem.save()
		
		return res.status(200).json({status:'ok', data:newCartItem})
	}catch(e){
		return res.status(400).json({status:'fail', error:e.message})
	}
}


cartController.getCartList=async(req, res)=>{
	try{
		const userId = req.params.id
		const cartList = await Cart.find({userId: userId}).populate('items.productId').populate('userId')

		res.status(200).json({status:'success', data:cartList })
	}catch(e){
		res.status(400).json({status:'fail', error:e.message})
	}
}

cartController.deleteCartItem = async(req,res)=>{
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