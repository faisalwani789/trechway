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
requestSchema.index({fromUserId:1,toUserId:1})

requestSchema.pre("save",function(next){
      //remove connections to self, user should not able to make a request to self id
        if(this.fromUserId.equals(this.toUserId))throw new Error("request to self error")   
        next()
})
const ConnectionRequest=mongoose.model('ConnectionRequest',requestSchema)
export default ConnectionRequest