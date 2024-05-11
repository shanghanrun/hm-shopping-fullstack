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
	totalPageNum:1,
	itemsList:[],
	nameList:[],
	imageList:[],
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
	getOrderList:async()=>{
		try{
			const resp = await api.get('/order')
			if(resp.status !==200) throw new Error(resp.error)
			console.log('order목록:', resp.data.data)
			console.log('page 정보:', resp.data.totalPageNum)
			console.log('itemsList :', resp.data.itemsList)
			console.log('nameList :', resp.data.nameList)
			console.log('imageList :', resp.data.imageList)
			set({
				orderList: resp.data.data,
				totalPageNum: resp.data.totalPageNum,
				itemsList: resp.data.itemsList,
				nameList: resp.data.nameList,
				imageList: resp.data.imageList
			})	
		}catch(e){
			console.log('e.error:', e.error)
			set({error: e.error})
		}
	},
	updateOrder:async()=>{}
}))

export default orderStore;