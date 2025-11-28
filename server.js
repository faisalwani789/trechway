import express from 'express'
import { configDotenv } from 'dotenv'
import connectDb from './src/config/database.js'
const app=express()
configDotenv()
connectDb().then(()=>{
    console.log("connection to db is succesfull")
    app.listen(port,()=>{
    console.log('listening to port '+port)
})
}).catch((err)=>{
    console.log('db error'+err.message)
})
const port=5000

app.get('/',(req,res)=>{
    res.send("welcome to trechway")
})

