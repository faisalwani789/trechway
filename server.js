import express from 'express'
import { configDotenv } from 'dotenv'
import connectDb from './src/config/database.js'
const app=express()
configDotenv()
connectDb()
const port=5000

app.get('/',(req,res)=>{
    res.send("welcome to trechway")
})

app.listen(port,()=>{
    console.log('listening to port '+port)
})