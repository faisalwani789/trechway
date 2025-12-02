import { Router } from "express"
const router=Router()

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
export default router