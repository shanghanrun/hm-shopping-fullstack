const User = require('../model/User')
const bcrypt = require('bcryptjs')
const saltRounds =10

const userController={}

userController.createUser = async(req, res)=>{
	try{
		const {email, password, name, level} = req.body;
		const user = await User.findOne({email})
		if(user){
			throw new Error('이미 가입된 유저입니다.')
		}

		const hash = bcrypt.hashSync(password, saltRounds)
		const newUser = new User({email,password: hash, name, level:level? level :'customer'})
		await newUser.save()
		
		return res.status(200).json({status:'success', data:newUser})
	}catch(e){
		return res.status(400).json({status:'fail', message:e.message})
	}
}

userController.loginWithEmail= async(req, res)=>{
	try{
		const {email,password} = req.body;
		const user = await User.findOne({email}, {
			createdAt:0, updatedAt:0, __v:0
		})
		console.log('찾은 유저 정보 :', user )
		if(!user){
			// 가입한 상태가 아니라는 메시지, 로그인페이지로 리디렉션
			throw new Error('가입한 상태가 아닙니다. email을 다시 확인해 주세요')
		} else{
			const isMatch = bcrypt.compareSync(password, user.password);  //user.password는 암호화된 것
			if(!isMatch){
				//암호가 일치하지 않습니다. 정확한 암호를 입력해주세요.
				// 로그인페이지로 다시 리디렉션
				throw new Error('패스워드가 일치하지 않습니다.')
			} else{
				//1. 토큰 생성 2. 유저정보와 토큰을 보냄 3.홈페이지로 이동 
				const token =user.generateToken()
				return res.status(200).json({status:'success', user, token})
			}
		}
	}catch(e){
		return res.status(409).json({status:'fail', message:e.message})
	}
}

userController.getUser=async(req, res)=>{
	try{
		const userId = req.userId
		const user = await User.findById(userId)
		if(!user){
			throw new Error('can not find user')
		}
		res.status(200).json({status:'success', user })
	}catch(e){
		res.status(400).json({status:'fail', message:e.message})
	}
}

module.exports = userController;