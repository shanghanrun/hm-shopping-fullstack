const authController ={}
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secretKey = process.env.JWT_SECRET_KEY

authController.authenticate =(req, res, next)=>{
	try{
		const tokenString = req.headers.authorization
		// console.log('tokenString :', tokenString)
		if(!tokenString){
			throw new Error('no token')
		} 
		const token = tokenString.replace("Bearer ",'')
		jwt.verify(token, secretKey, (err, payload)=>{
			if(err){
				throw new Error('invalid token')
			}
			// return res.status(200).json({status:'ok', userId:payload._id})
			req.userId = payload._id
		})
		next()
	} catch(e){
		return res.status(400).json({status:'fail', message:e.message})
	}
}
module.exports = authController;