import User from "../Models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { validationResult } from "express-validator"
export const getUser = async (req, res) => {

    const { id } = req.params
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

export const addUser = async (req, res) => {
 
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    const allowedValues = ['email', 'password'] //data sanitization
    const { email, password } = req.body
    try {
        const allowed = Object.keys(req.body).every(k => allowedValues.includes(k))
        console.log(allowed)
        if (!allowed) throw new Error('not allowed')
        const hash = await bcrypt.hash(password, 10)
        const newUser = new User({ email, password: hash })
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

        const pass = await bcrypt.compare(password, user.password)
        if (!pass) return res.status(400).send("invalid credentials")
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' })


        res.json({ message: 'success', token: token })
    } catch (error) {

        res.status(500).send(error.message)
    }
}
export const updateUser = async (req, res) => {
    const allowedChanges = ['password', 'userName', 'profilePic', 'isPrivate'] //data sanitization
    const { id } = req.user
    try {
        Object.keys(req.body).every(k => {
            if (!allowedChanges.includes(k)) throw new Error('changes not allowed')
        })
        const user = await User.findByIdAndUpdate(id, req.body, { runValidators: true, returnDocument: 'after' })
        res.send(user)
    } catch (error) {
        res.send(error.message)
    }

}