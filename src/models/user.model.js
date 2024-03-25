import { Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new Schema({
    name:{
        type: String,
        required: [true,`name is required`],
        trim:true,
        minLength: [2, `the name shoud contain atleast 2 characters`],
        maxLength: [50,`the name shoud contain atmost 50 characters`]
    },
    email:{
        type: String,
        required: [true,`email is required`],
        trim:true,
        unique: true,
    },
    phone:{
        type: String,
        required: [true, `the phone number is required`],
    },
    avatar:{
        public_id:{
        type: String,
        required: [true, `the public_id is required`],
        },
        secure_url:{
            type: String,
            required: [true, `the secure url is required`]
        }
    }
},{timestamps: true})

UserSchema.pre('save', async(next)=>{
    if(!this.isModified('password'))return next()
    this.password= await bcrypt.hash(password, 10)
    next()
})

UserSchema.methods ={
    generateAccessToken: async function(){
        return await jwt.sign(
            {id:this._id, email: this.email, name: this.name},
            process.env.ACCESS_TOKEN,
            {expiresIn:'5m'}
        )
    }
}

const User = model('User', UserSchema)
export default User