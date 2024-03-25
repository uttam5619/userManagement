
const signUp =async (req,res)=>{
    const { name, email, password, phone} =req.body
    if(!email || !password || !phone || !name){
        return res.status(400).json({success:false, message:`All fields are required`})
    }
}

const signIn =async (req,res)=>{
    const { email,password }=req.body
    if(!email || !password){
        return res.status(400).json({success:false, message:`email and password are required`})
    }
}

const logOut =async (req,res)=>{

}

export {
    signUp,
    signIn,
    logOut
}