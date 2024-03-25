import express from 'express';
import { logOut, signIn, signUp } from '../controller/auth.controller.js';
const authRoute =express.Router()
import upload from '../middleware/avatar.multer.middleware.js';

authRoute.post('/signUp',upload.single('avatar'),signUp)
authRoute.post('/signIn',signIn)
authRoute.post('/logOut',logOut)


export default authRoute