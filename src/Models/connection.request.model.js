import mongoose from "mongoose";
const requestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    toUserId:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'User',
          required:true
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:['accepted','rejected','interested'],
            message:`{VALUE} is of type incorrect`
        }
    }
},{timestamps:true})
requestSchema.index({fromUserId:1,toUserId:1})

requestSchema.pre("save",async function(){
      //remove connections to self, user should not able to make a request to self id
        if(this.fromUserId.equals(this.toUserId))throw new Error("request to self error")   
       
})
const ConnectionRequest=mongoose.model('ConnectionRequest',requestSchema)
export default ConnectionRequest