import Post from '../Models/post.model.js'
export const  addPost=async(req,res)=>{
    const{description,tags}=req.body
    // console.log(tags)
    const{id}=req.user
    const allowedBody=['images','description','tags']
    if(!req.files || req.files.length ===0) return res.status(400).json({error:'no files uploaded'})
    try {
        
        const uploadedImages=req.files.map(file=>(file.path.replace('http://','https://')))
        
        const alllowedChanges=Object.keys(req.body).every(k=>allowedBody.includes(k))
        if(!alllowedChanges) throw new Error("bad request")
        
       

         const newPost= new Post({images:uploadedImages,author:id,description,tags})
         const post=await newPost.save()
        res.status(201).json({post})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
   
}
export const getFeed=async(req,res)=>{
    const{cursor,limit=10}=req.query
    let nextCursor=null
    try {
        let posts =await Post.find().sort({_id:-1}).select('-createdAt -updatedAt').populate('author',  'profilePic _id').limit(parseInt(limit)+1)
        console.log(posts)
        if(posts.length > limit){
            nextCursor=posts[limit]._id
            posts=posts.slice(0,limit)
        }
        // console.log(posts)
        res.status(200).json({posts,nextCursor})
    } catch (error) {
        res.status(500).send(error.message)
    }
}