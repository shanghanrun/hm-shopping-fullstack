import {create} from 'zustand'

const orderStore =create((set)=>({
	totalPrice:0,
	ship:{},
	payment:{},
	orderList:[],
	setTotalPrice:(val)=>set({totalPrice: val}),
	setShip:(val)=>set({ship: val}),
	setPayment:(val)=>set({payment: val}),
	addOrder:(val)=>set({orderList:{...val}}),
	createOrder:async(data)=>{

	},
	getOrder:async()=>{},
	updateOrder:async()=>{}
}))

export default orderStore;