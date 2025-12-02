import User from "../Models/user.model.js"
import { validationResult } from "express-validator"


export const addUser = async (req, res) => {
 
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    const allowedValues = ['email', 'password'] //data sanitization
    const { email, password } = req.body
    try {
        const allowed = Object.keys(req.body).every(k => allowedValues.includes(k))
        console.log(allowed)
        if (!allowed) throw new Error('not allowed')
        const user=await User.findOne({email:email})  
        
        if(user)throw new Error('user already registered')
        const newUser = new User({ email, password })
        newUser.save()
        res.send("user added successfully")
    } catch (error) {
        res.status(500).send(error.message)
    }
}
export const signIn = async (req, res) => {
    const errors = validationResult(req)
    const allowedValues = ['email', 'password'] //data sanitization
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    const { email, password } = req.body
    try {
        const allowed = Object.keys(req.body).every(k => allowedValues.includes(k))
        if (!allowed) throw new Error('not allowed')
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).send("no user found")
        }

        const isValidPassword=user.comparePassword(password)
        if (!isValidPassword) return res.status(400).send("invalid credentials")
        const token = user.getJwt()
        // res.cookie('token',token)
        res.json({ message: 'success', token: token })
    } catch (error) {

        res.status(500).send(error.message)
    }
}

export const logout=async(req,res)=>{
   
}