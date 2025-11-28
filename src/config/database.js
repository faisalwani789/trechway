import mongoose from "mongoose"

const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI).then(()=>console.log("connection to db is succesfull"))
    } catch (error) {
        console.log(error.message)
    }
   
  
}

export default connectDb
