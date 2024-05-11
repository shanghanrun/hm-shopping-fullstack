const Order = require('../model/Order')
const Product = require('../model/Product')
const { randomStringGenerator } = require('../utils/randomStringGenerator')
const productController = require('./productController')
const cartController = require('./cartController')

const orderController={}


orderController.createOrder = async(req, res)=>{
	try{
		const userId = req.userId
		const {shipTo, contact, totalPrice, items} = req.body;
		// 재고확인 & 재고 업데이트
		const insufficientStockItems = await productController.checkItemsStock(items)

		// 재고가 충분하지 않은 아이템이 있으면 -> 에러
		if(insufficientStockItems.length >0){
			const errorMessage = insufficientStockItems.reduce((total, item)=> total += `${item.message} \n;`, '')
			throw new Error(errorMessage)
		}
		const orderNum = randomStringGenerator()
		const newOrder = new Order({
			userId, shipTo, contact,totalPrice, items,
			orderNum: orderNum,
		})
		await newOrder.save()
		//save후에 cart를 비워준다.
		// cartController.emptyCart() 
		// // await로 기다리게 하지 않고 비동기로 작업하게 놔둘수도 있지만, 
		// //제대로 비워줘야 화면에 반영되므로 await을 사용한다.

		return res.status(200).json({status:'ok', orderNum: orderNum})
	}catch(e){
		return res.status(400).json({status:'fail', error:e.message})
	}
}


orderController.getOrderList=async(req, res)=>{
	const PAGE_SIZE =5
	function summarizeItems(itemsList) {
		const summary = [];

		// 각 항목을 반복하며 요약 정보 생성
		itemsList.forEach((items, index) => {
			// 각 항목의 상품 ID 및 수량을 추출하여 요약 정보 생성
			const productIds = items.map(item => item.productId);
			const count = productIds.length; // count를 productIds 배열의 길이로 설정

			// 요약 정보를 객체에 추가
			const itemSummary = {
			item: index + 1,
			count: count,
			productIds: productIds
			};

			// 최종 요약 정보 배열에 추가
			summary.push(itemSummary);
		});

		return summary;
	}

	async function fetchProducts(itemsInfo) {
		const newItemsInfo = [];

		// 각 항목을 반복하며 제품 검색
		for (const itemInfo of itemsInfo) {
			const { item, count, productIds } = itemInfo;

			// productIds 배열 내 각 제품에 대해 findOne 수행
			const productList = await Promise.all(
			productIds.map(async (productId) => {
				// MongoDB에서 해당 제품 검색
				return await Product.findOne({ _id: productId });
			})
			);

			// 새로운 구조로 변환하여 newItemsInfo에 추가
			newItemsInfo.push({
			item,
			count,
			productList,
			});
		}

		return newItemsInfo;
		}


	try{
		const userId = req.userId
		const orderList = await Order.find({userId})
		const itemsList = orderList.map((order)=>{
			return order.items
		})
		console.log('itemsList : ', itemsList)
		const itemsInfo = summarizeItems(itemsList);
		console.log('itemsInfo :', itemsInfo);

		const newItemsInfo = await fetchProducts(itemsInfo);
		console.log('newItemsInfo: ', newItemsInfo);

		// newItemsInfo[0].productList.forEach((item)=> console.log(item.name))  이렇게 꺼낼 수 있다.



		const totalItemNum = await Order.find({userId}).count()
		const totalPages = Math.ceil(totalItemNum / PAGE_SIZE)
		res.status(200).json({status:'success', data: orderList, totalPageNum:totalPages, itemsInfo:newItemsInfo })
	}catch(e){
		res.status(400).json({status:'fail', error:e.message})
	}
}


module.exports = orderController;