const Product = require('../model/Product')

const productController={}

productController.createProduct = async(req, res)=>{
	try{
		const {sku,name,image,category,description,stock,price,status,isDeleted} = req.body;

		const newProduct = new Product({sku, name,image,category,description,stock,price,status,isDeleted})
		await newProduct.save()
		
		return res.status(200).json({status:'ok', data:newProduct})
	}catch(e){
		return res.status(400).json({status:'fail', message:e.message})
	}
}


productController.getAllProducts=async(req, res)=>{
	try{
		const productList = await Product.find()
		res.status(200).json({status:'success', productList })
	}catch(e){
		res.status(400).json({status:'fail', message:e.message})
	}
}
productController.getProductById = async(req,res)=>{
	try{
		const id = req.params.id
		const foundProduct = await Product.find({_id:id})
		if(foundProduct){
			res.status(200).json({status:'ok', data:foundProduct})
		}
	}catch(e){
		res.status(400).json({status:'fail', message:e.message})
	}
}

productController.deleteProduct = async(req,res)=>{
	try{
		const id = req.params.id
		await Product.delete({_id:id})
		res.status(200).json({status:'ok', message:'Product was deleted successfully' })
	}catch(e){
		res.status(400).json({status:'fail', message:e.message})
	}
}

productController.updateProduct =async(req,res)=>{
	try{
		const id = req.params.id
		const {name, image,category, description,stock,status,isDeleted} = req.body;
		const foundProduct = await Product.findOne({_id:id})
		let updatedProduct = {...foundProduct, name,image,category,description,stock,status,isDeleted}
		await Product.updateOne(
			{_id:id},
			{ $set: {...updatedProduct}}
		)
		updatedProduct = await Product.findOne({_id:id})
		res.status(200).json({status:'ok', data:updatedProduct})
	}catch(e){
		res.status(400).json({status:'fail', message:e.message})
	}
}

module.exports = productController;