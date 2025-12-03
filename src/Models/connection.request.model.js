import mongoose from "mongoose";
const requestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
          type:mongoose.Schema.Types.ObjectId,
          required:true
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:['accepted','rejected','pending'],
            message:`{VALUE} is of type incorrect`
        }
    }
},{timestamps:true})

const ConnectionRequest=mongoose.model('ConnectionRequest',requestSchema)
export default ConnectionRequest