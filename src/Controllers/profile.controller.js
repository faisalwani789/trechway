import { Router } from "express"
import User from "../Models/user.model.js"
import { passwordValidator } from "../middlewares/validation.middleware.js"
import { validationResult } from "express-validator"
const router=Router()

export const getProfile = async (req, res) => {

    const { id } = req.user
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(400).send("no user found")
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send("internal server error")
    }
}
export const updateProfile = async (req, res) => {
    const allowedChanges = [ 'userName', 'profilePic', 'isPrivate','about'] //data sanitization
    const { id } = req.user
    try {
        Object.keys(req.body).every(k => {
            if (!allowedChanges.includes(k)) throw new Error('changes not allowed')
        })
        const user = await User.findByIdAndUpdate(id, req.body, { runValidators: true, returnDocument: 'after' })
        //we can also update user by using .doc.save() -> first by finding and then applying new values from body->this helps to run validations schema automaticlly without writing runValidators, runs pre/post save hooks
        res.send(user)
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }

}
export const forgotPassword=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty())return res.status(400).json({ errors: errors.array() })
    const{password}=req.body
    const {id}=req.user
    const allowedChanges=['password','confirmPassword']
    try {
        const validChange=Object.keys(req.body).every(k =>allowedChanges.includes(k))
        if(!validChange)throw new Error("changes not allowed")
        const user=await User.findById(id)
        user.password=password
        await user.save()
        res.status(201).json({success:true,message:'password updated Successfully'})

    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
    
}
export default router