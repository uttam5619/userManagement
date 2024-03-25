import { config } from 'dotenv'
config()
import {app} from './app.js'
import session from 'express-session'
import connectDB from './src/config/db.config.js'

const PORT=process.env.PORT||7071
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