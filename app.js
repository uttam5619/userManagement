import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './src/routes/user.route.js';
import cookieParser from 'cookie-parser';
import authRoute from './src/routes/auth.route.js';
const app= express();

app.set('view engine', 'ejs')
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }) );
app.use(bodyParser.json());
app.use(cookieParser())

app.use('/usermanagement/v1/user', userRouter)
app.use('/usermanagement/v2/auth', authRoute)


export {app}

