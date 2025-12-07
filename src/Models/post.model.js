import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
        unique:true
    },
    images: {
        type: [String],
        required: true
    },

    metrics: {
        likes: {
            type: Number,
        },
        comments: {
            type: [String]
        },
    },
    description: {
        type: String,
    },

    tags: {
        type: [String]
    },
    dailyCount:{
        type:Number,
        default:0
    },
    lastReset:{
        type:Date,
        default:Date.now
    }

}, { timestamps: true })
const Post = mongoose.model('Post', postSchema)
export default Post