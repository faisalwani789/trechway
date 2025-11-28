import mongoose from "mongoose";
const postSchema= new mongoose.Schema({
    author:{
        //we should use user here and populate also if needed
        type:'String',
    },
    images:{
        type:[String]
    },
    likes:{
        type:Number,
    },
    comments:{
        type:[String]
    },

})
const Post=mongoose.model('Post',postSchema)
export default Post