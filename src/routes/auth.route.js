import express from 'express';
import { logOut, signIn, signUp } from '../controller/auth.controller.js';
const authRoute =express.Router()

authRoute.post('/signUp',signUp)
authRoute.post('/signIn',signIn)
authRoute.post('/logOut',logOut)


export default authRoute