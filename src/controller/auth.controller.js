import { validateEmail } from "../utils/validation.js"
import User from "../models/user.model.js"
import { profileImage } from "../utils/constants.js"
import cloudinary from 'cloudinary'
import fs from 'fs/promises'

const cookieOptions ={
    maxAge:7*24*60*60*1000,
    httpOnly: true,
    secure: true,
}

const signUp =async (req,res)=>{
    const { name, email, password, phone} =req.body
    console.log(name, email, password, phone)
    if(!email || !password || !phone || !name){
        return res.status(400).json({success:false, message:`all fields are required`})
    }
    const isEmailValid =validateEmail(email)
    if(!isEmailValid){
        return res.status(400).json({success:false, message:`provide a valid email`})
    }
    try{
    const doesUserAlreadyExist = await User.findOne({email})
    if(doesUserAlreadyExist){
        return res.status(400).json({success:false, message:`an user already registered with this email`})
    }
    const user = await User.create({
        name,
        email,
        password,
        avatar:{public_id:email, secure_url:profileImage}
    })
    if(!user){
        return res.status(400).json({success:false, message:`error occured while creating user`})
    }

    //file uploading
    if(req.file){
        console.log(JSON.stringify(req.file))
        const result =await cloudinary.uploader.upload(req.file.path,{
            width:250,
            height:250,
            gravity:'faces',
            crop:'fill'
        })
        if(result){
            user.avatar.public_id = result.public_id
            user.avatar.secure_url = result.secure_url
            fs.unlink(`uploads/${req.file.filename}`)
        }else{
            return res.status(400).json({success:false, message:`error occured while uploading on cloudinary`})
        }
    }
    user.save()
    const registeredUser = await User.findOne(user._id).select('-password')
    const token = registeredUser.generateAccessToken()
    res.cookie('token',token, cookieOptions)
    return res.status(201).json({success:true, message:`user registered successfully`,data:registeredUser})
    }catch(err){
        console.log(err.message)
    }
}

const signIn =async (req,res)=>{

    const { email,password }=req.body
    if(!email || !password){
        return res.status(400).json({success:false, message:`email and password are required`})
    }
    const isEmailValid =validateEmail(email)
    if(!isEmailValid){
        return res.status(400).json({success:false,message:`provide a valid email`})
    }

    try{
    const user =await User.findOne({email})
    if(!user){
        return res.status(400).json({success:false,message:`user not registered`})
    }
    const isPasswordValid =user.validatePassword(password)
    if(!isPasswordValid){
        return res.status(400).json({success:false,message:`provide a valid password`})
    }
    const loggedInUser =await User.findOne(user._id).select('-password')
    const token = loggedInUser.generateAccessToken()
    res.cookie('token', token, cookieOptions)
    return res.status(200).json({success:true, message:`login successfully`,data:loggedInUser})
    
    }catch(err){
        console.log(err.message)
    }
}

const logOut =async (req,res)=>{

}

export {
    signUp,
    signIn,
    logOut
}