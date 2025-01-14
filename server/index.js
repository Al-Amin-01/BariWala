
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import  userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config()
const app=express();
app.use(express.json())
app.use(cookieParser())
// app.use(cors({
//   origin: 'http://localhost:5173', // Allow requests from your frontend
//   credentials: true, // Allow cookies if needed
// }));
mongoose.connect(process.env.MONGO_URL) 
    .then(()=>{
        console.log("connected to db")
    })
    .catch(error=>{
        console.log(error)
    })


app.listen(3000,()=>{
    console.log('server running on port 3000')
})

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/listing',listingRouter)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error'

    return res.status(statusCode).json({
        
            success:false,
            message
        }
    )
})