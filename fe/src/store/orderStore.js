import {create} from 'zustand'
import api from '../utils/api'
import uiStore from './uiStore'
import cartStore from './cartStore'

const orderStore =create((set)=>({
	totalPrice:0,
	ship:{},
	payment:{},
	orderNum:'임시123',
	orderList:[],
	setTotalPrice:(val)=>set({totalPrice: val}),
	setShip:(val)=>set({ship: val}),
	setPayment:(val)=>set({payment: val}),
	addOrder:(val)=>set({orderList:{...val}}),
	createOrder:async(data, navigate)=>{
		try{
			const resp = await api.post('/order', data)
			if(resp.status !==200){
				throw new Error(resp.error)
			}
			console.log('오더넘버:',resp.data.orderNum)
			set({orderNum: resp.data.orderNum})
			await cartStore.getState().emptyCart()
			// console.log('비우기 성공')
			//성공메시지는 생략하고, 결제성공 페이지로 이동
			navigate('/payment/success')
			
		}catch(e){
			console.log(e.error)
			uiStore.getState().showToastMessage(e.error, 'error'); 
		}
	},
	getOrder:async()=>{},
	updateOrder:async()=>{}
}))

export default orderStore;