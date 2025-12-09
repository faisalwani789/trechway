import mongoose from "mongoose";
const activitySchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
     dailyCount:{
        type:Number,
        default:0
    },
    
    date:{
        type:String,
        required:true,
    },
    expiresAt:{
        type:Date,
        default:()=>Date.now()+2*24*60*60*1000 //ms
    }
},{timestamps:true})

activitySchema.index({expiresAt:1},{expireAfterSeconds:0}) //ttl index
const PostActivity=mongoose.model('PostActivity', activitySchema)
export default PostActivity