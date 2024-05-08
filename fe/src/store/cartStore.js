import {create} from 'zustand'
import api from '../utils/api';
import uiStore from './uiStore'

const cartStore =create((set,state)=>({
	error:'',
	cartList:[],
	// cartCount:0,
	addToCart: async({id,size}) => {
		try{
			const resp = await api.post('/cart',{id,size})
			if(resp.status !==200) throw new Error(resp.error)
			console.log('성공한 데이터:', resp.data.data)
			uiStore.getState().showToastMessage('카트에 추가했습니다.', 'success');

			set((state)=>({
				cartList: [...state.cartList, resp.data.data],
				cartCount: state.cartCount +1
			}))
		}catch(e){
			console.log(e.message)
			set({error: e.message})
			uiStore.getState().showToastMessage(e.message, 'error');
		}
	},
	getCartList:async(id)=>{
		try{
			const resp = await api.get('/cart/'+id)
			if(resp.status !==200) throw new Error(resp.error)
			console.log('성공한 cartList:', resp.data.data)
			// uiStore.getState().showToastMessage('카트리스트를 받아왔습니다.', 'success');

			set((state)=>({
				cartList: resp.data.data
			}))
		}catch(e){
			console.log(e.message)
			set({error: e.message})
			uiStore.getState().showToastMessage(e.message, 'error');
		}
	},
	// getCartList:async()=>set(),
	deleteCartItem:async()=>set(),
	updateQty:async()=>set(),
	getCartQty:async()=>set(),
	emptyStoreCartList:()=>set({cartList: []})
}))

export default cartStore;