import User from "../Models/user.model.js"
export const getUser=async(req,res)=>{
    const {id}=req.query
    try {

        const user=await User.findById(id)
        if(!user){
            return res.status(400).send("no user found")
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send("internal server error")
    }
}
