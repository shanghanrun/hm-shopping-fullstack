import {create} from 'zustand'
import api from '../utils/api';
import uiStore from './uiStore'

const cartStore =create((set,state)=>({
	error:'',
	cart:{},
	cartCount:0,
	addToCart: async({id,size}) => {
		try{
			const resp = await api.post('/cart',{productId:id,size:size})
			if(resp.status !==200) throw new Error(resp.error)
			console.log('성공한 cart데이터:', resp.data.data)
			console.log('성공한 cartItemQty:', resp.data.cartItemQty)
			uiStore.getState().showToastMessage('카트에 추가했습니다.', 'success');

			set({
				cart: resp.data.data,
				cartCount: resp.data.cartItemQty
			})
		}catch(e){
			console.log(e.message)
			set({error: e.message})
			uiStore.getState().showToastMessage(e.message, 'error');
		}
	},
	getCart:async()=>{
		try{
			const resp = await api.get('/cart')
			if(resp.status !==200) throw new Error(resp.error)
			console.log('성공한 cart데이터:', resp.data.data)
			console.log('성공한 cartItemQty:', resp.data.cartItemQty)
			// uiStore.getState().showToastMessage('카트리스트를 받아왔습니다.', 'success');

			set({
				cart: resp.data.data,
				cartCount: resp.data.cartItemQty
			})
		}catch(e){
			console.log(e.message)
			set({error: e.message})
			uiStore.getState().showToastMessage(e.message, 'error');
		}
	},
	
	deleteCartItem:async(productId)=>{
		try{
			const resp = await api.delete('/cart/'+productId)
		}catch(e){

		}
	},
	updateQty:async(productId, qty)=>{
		try{
			const resp = await api.put('/cart/'+productId, {qty})
		}catch(e){

		}
	},
	getCartQty:async()=>set(),
	emptyStoreCartList:()=>set({cartList: []})
}))

export default cartStore;