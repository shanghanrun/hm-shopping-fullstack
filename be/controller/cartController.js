const Cart = require('../model/Cart')
const Product = require('../model/Product')

const cartController={}

cartController.createCartItem = async(req, res)=>{
	try{
		const {productId, size} = req.body;
		const userId = req.userId
		//중복을 방지하기 위해, 유저정보로 카트찾기.
		const cartList = await Cart.find({ userId });
		console.log('백앤드 찾은 cartList:', cartList)
		for (const currentCart of cartList) {
			if (currentCart) { //currentCart가 존재해야
				const isExist = currentCart.items[0].item.productId.equals(productId) && currentCart.items[0].size === size;
				if (isExist) {
					console.log('존재함')
					throw new Error('아이템이 이미 담겨 있습니다.');
				}
			}
		}

		// 새로운 카트 생성 및 아이템 추가
		const cart = new Cart({
			userId,
			items: [{
				productId,
				size
			}]
		});
		await cart.save();

		return res.status(200).json({ status: 'ok', data: cart });

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