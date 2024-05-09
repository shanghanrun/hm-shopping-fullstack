const mongoose =require('mongoose')
const User = require('./User')
const Product = require('./Product')

const Schema = mongoose.Schema
const orderSchema = Schema({
	userId:{type:mongoose.ObjectId, ref:User},
	status:{type:String, default:'배송준비중'},
	shipTo:{type:String, required:true},
	contact:{type:String, required:true},
	totalPrice:{type:Number, default:0},
	orderNum:{type: String},
	items:[{
		productId:{type:mongoose.ObjectId, ref:Product},
		price:{type:Number, required:true},
		size:{type:String, required:true},
		qty:{type:Number, default:1, required:true}		
	}]
},{timestamps:true})

orderSchema.methods.toJSON =function(){
	const obj = this._doc
	delete obj.__v
	delete obj.createdAt
	delete obj.updatedAt
	return obj
}

const Order = mongoose.model("Order", orderSchema)

module.exports = Order;