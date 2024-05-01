import {create} from 'zustand'

const orderStore =create((set)=>({
	orderList:{},
	addOrder:(val)=>set({orderList:{...val}}),
	createOrder:()=>set(),
	getOrder:async()=>set(),
	updateOrder:async()=>set()
}))

export default orderStore;