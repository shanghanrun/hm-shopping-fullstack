import {create} from 'zustand'

const productStore =create((set)=>({
	productList:{},
	addProduct:(val)=>set({productList:{...val}}),
	getProductList:()=>set(),
	createProduct:()=>set(),
	deleteProduct:()=>set(),
	editProduct:()=>set(),
	getProductDetail:()=>set(),
}))

export default productStore;