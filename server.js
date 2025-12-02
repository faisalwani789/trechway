import express from 'express'
import { configDotenv } from 'dotenv'
import connectDb from './src/config/database.js'
import authRouter from './src/router/auth.routes.js'
import profileRouter from './src/router/profile.routes.js'
import { authMiddleware } from './src/middlewares/auth.middleware.js'
const app=express()
app.use(express.json())
configDotenv()
connectDb().then(()=>{
    console.log("connection to db is succesfull")
    app.listen(port,()=>{
    console.log('listening to port '+port)
})
}).catch((err)=>{
    console.log('db error'+err.message)
})
app.use("/api/v1/register",authRouter)
app.use("/api/v1/user",authMiddleware,profileRouter)
const port=5000

// app.get('/',(req,res)=>{
//     res.send("welcome to trechway")
// })

