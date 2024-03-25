import { config } from 'dotenv'
config()
import {app} from './app.js'
import session from 'express-session'
import connectDB from './src/config/db.config.js'
import {v2 as cloudinary} from 'cloudinary';

const PORT=process.env.PORT||7071


          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});

connectDB()

app.use(session({
    secret: 'mysecret',
    saveUninitialized: true,
    resave:false,
}))

app.use((req, res, next)=>{
    res.locals.message =req.session.message,
    delete req.session.message;
    next();
})

app.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}`)
})