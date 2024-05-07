const Product = require('../model/Product')

const PAGE_SIZE =5
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
		const {page, name}= req.query  // ?뒤의 쿼리값
		const condition = name? {name:{$regex:name, $options:'i', isDeleted:false}} : {isDeleted:false}
		// const condition2 = ....  
		let query = Product.find(condition) //함수를 만들어둠.
		// query = Product.find(condition2)
		let response = {status:"success"}  // response 전용객체를 만듬

		if(page){
			query.skip((page-1)*PAGE_SIZE).limit(PAGE_SIZE)
			//전체페이지(총페이지) = 전체 데이터 /PAGE_SIZE
			const totalItemNum = await Product.find(condition).count()
			const totalPages = Math.ceil(totalItemNum / PAGE_SIZE)
			response.totalPageNum = totalPages
		}

		const productList = await query.exec() 
		response.data = productList
		res.status(200).json(response)
		console.log('찾은 productList:', productList)
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

productController.updateProduct =async(req,res)=>{
	try{
		const id = req.params.id
		const {sku,name,image,category,description,stock,price,status,isDeleted} = req.body;
		const updatedProduct = await Product.findByIdAndUpdate(
			{_id:id},
			{ sku,name,image,category,description,stock,price,status,isDeleted },
			{ new: true} //새로 업데이트한 데이터를 return해줌 (product값으로 넣어줌)
		)
		if(!updatedProduct) throw new Error("item doesn't exist")
		res.status(200).json({status:'ok', data: updatedProduct})
	}catch(e){
		res.status(400).json({status:'fail', message:e.message})
	}
}

productController.deleteProduct =async(req, res)=>{
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(
      { _id: id },
      { isDeleted: true }
    );
    if (!product) throw new Error("No item found");
    res.status(200).json({ status: "success", message:'A item was deleted successfully' });
  } catch (e) {
    res.status(400).json({ status: "fail", message: e.message });
  }
};
// productController.deleteProduct = async(req,res)=>{
// 	try{
// 		const id = req.params.id
// 		const result = await Product.deleteOne({_id:id})
// 		if (result.deletedCount === 1) {
// 			res.status(200).json({ status: 'ok', message: 'Item deleted successfully' });
// 		} else {
// 			throw new Error("Item doesn't exist");
// 		}
// 	}catch(e){
// 		res.status(400).json({status:'fail', message:e.message})
// 	}
// }
productController.getProductById = async(req,res)=>{
	try{
		const id = req.params.id
		const foundProduct = await Product.findById(id)
		if (foundProduct) {
			res.status(200).json({ status: 'ok', data: foundProduct });
		} else {
			throw new Error("Item doesn't exist");
		}
	}catch(e){
		res.status(400).json({status:'fail', message:e.message})
	}
}

module.exports = productController;