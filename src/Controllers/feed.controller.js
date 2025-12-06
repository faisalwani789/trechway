import Post from '../Models/post.model.js'
export const  addPost=async(req,res)=>{
    const{images,description,tags}=req.body
    const{id}=req.user
    const allowedBody=['images','description','tags']
    
    try {
        const alllowedChanges=Object.keys(req.body).every(k=>allowedBody.includes(k))
        if(!alllowedChanges) throw new Error("bad request")
        
         const newPost= new Post({images,author:id,description,tags})
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