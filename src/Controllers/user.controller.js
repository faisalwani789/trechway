import User from "../Models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
export const getUser=async(req,res)=>{
    const {id}=req.params
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



export const addUser=async(req,res)=>{
    const{email,password}=req.body
    try {
        const hash=await bcrypt.hash(password,10)
        const newUser=new User({email,password:hash})
        newUser.save()
        res.send("user added successfully")
    } catch (error) {
          res.status(500).send("internal server error")
    }
}
export const signIn=async(req,res)=>{
    const {email,password}=req.body
     try {
        const user= await User.findOne({email:email})
        if(!user){
              return res.status(400).send("no user found")
        }
       
        const pass=await bcrypt.compare(password,user.password)
         if(!pass) return res.status(400).send("invalid credentials")
         const token=jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:'1h'})
       
       
        res.json({message:'success',token:token})
    } catch (error) {
          res.status(500).send(error.message)
    }
}