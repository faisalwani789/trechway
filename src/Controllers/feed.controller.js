import Post from '../Models/post.model.js'
import { checkDailyLimit } from '../utils/dailyLimit.js'
export const  addPost=async(req,res)=>{
    const{description,tags}=req.body
    const{id}=req.user
    const allowedBody=['images','description','tags']
    if(!req.files || req.files.length ===0) return res.status(400).json({error:'no files uploaded'})
    try {
        const uploadedImages=req.files.map(file=>(file.path.replace('http://','https://')))
        
        const alllowedChanges=Object.keys(req.body).every(k=>allowedBody.includes(k))
        if(!alllowedChanges) throw new Error("bad request")
        
        await checkDailyLimit(id)
         const newPost= new Post({images:uploadedImages,author:id,description,tags})
         const post=await newPost.save()
        res.status(201).json({post})
    } catch (error) {
        
    }
   
}
export const getFeed=async(req,res)=>{
    try {
        const posts =await Post.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).send(error.message)
    }
}