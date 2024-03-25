import express from 'express';
import { deleteUser, getUser, updateUser, getAllUsers } from '../controller/user.controller.js';
const userRouter =express.Router()

userRouter.get('/',(req, res)=>{
    res.render('index')
})


userRouter.put('/update', updateUser)
userRouter.get('/get', getUser)
userRouter.post('/delete', deleteUser)

userRouter.get('/users',getAllUsers)

userRouter.get('*',(req, res)=>{
    res.send(`PAGE NOT FOUND`)
})


export default userRouter