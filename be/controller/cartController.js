const Cart = require('../model/Cart')
const Product = require('../model/Product')

const cartController={}

cartController.createCartItem = async(req, res)=>{
	try{
		const {productId, size} = req.body;
		console.log('백앤드 productId', productId)
		console.log('req.body', req.body)
		const userId = req.userId
		//중복을 방지하기 위해, 유저정보로 카트찾기.
		let cart = await Cart.findOne({userId})
		console.log('찾은 cart:', cart)
		if(cart){
			const existItem = cart.items.find((item)=>item.productId.equals(productId) && item.size ===size)
			//(cart.items가 배열이기 때문에 이런 find메소드 가능하다)
			if(existItem){
				throw new Error('카트 안에 이미 해당 제품과 size의 아이템이 있습니다.')
			} else{
				cart.items = [...cart.items, {productId, size}]  // cart가 몽고디비로 만든 인스턴스이지만 그러면서 객체이다.
				await cart.save() //변화된 cart객체값을 db에 다시 저장해서 수정한다.
				res.status(200).json({ status: 'ok', data: cart, cartItemQty: cart.items.length });		
			}

		} else{
			cart = new Cart({userId})
			await cart.save()

			cart.items = [...cart.items, {productId, size}]  // cart가 몽고디비로 만든 인스턴스이지만 그러면서 객체이다.
			await cart.save() //변화된 cart객체값을 db에 다시 저장해서 수정한다.
			res.status(200).json({ status: 'ok', data: cart, cartItemQty: cart.items.length });
			}
		
		// 찾은 cart, 혹은 새로만든 cart 를 대상으로
		// cart 안의 items들에서 productId와 size가 일치하는 item이 있는 지 찾는다. 있으면 에러발생하고 빠져나온다.
		// 없다면 productId, size를 넣어 새로운 아이템이 추가된 cart로 만든다.

	}catch(e){
		return res.status(400).json({status:'fail', error:e.message})
	}
}

cartController.getCart=async(req, res)=>{
	try{
		const userId = req.userId
		const cart = await Cart.findOne({userId}).populate('items.productId').populate('userId')

		res.status(200).json({status:'success', data:cart, cartItemQty:cart.items.length })
	}catch(e){
		res.status(400).json({status:'fail', error:e.message})
	}
}

cartController.deleteCartItem = async(req,res)=>{
	try{
		const userId = req.userId
		const productId = req.params.id
		const cart = await Cart.findOne({userId})
		const newItems = cart.items.filter((item)=>
			item.productId !== productId
		)
		cart.items = [...newItems]
		await cart.save()
		res.status(200).json({status:'ok', data:cart, cartItemQty: cart.items.length })
	}catch(e){
		res.status(400).json({status:'fail', error:e.message})
	}
}

cartController.updateItemQty =async(req,res)=>{
	try{
		const userId = req.userId
		const productId = req.params.id
		const {qty} = req.body;
		const cart = await Cart.findOne({userId})
		const foundItem = cart.items.find((item)=>
			item.productId === productId
		)
		foundItem.qty = qty
		const newItems = [...cart.items, foundItem]
		cart.items = [...newItems]
		await cart.save()
		
		res.status(200).json({status:'ok', data:cart, cartItemQty: cart.items.length})
	}catch(e){
		res.status(400).json({status:'fail', error:e.message})
	}
}

module.exports = cartController;