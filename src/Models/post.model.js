import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    images: {
        type: [String],
        required: true
    },

    metrics: {
        likes: {
            type: Number,
            default:0
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
   

}, { timestamps: true })
const Post = mongoose.model('Post', postSchema)
export default Post