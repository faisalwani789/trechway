import jwt from 'jsonwebtoken'
export const authMiddleware = (req, res, next) => {
    // const authHeader = req.headers.authorization
    const {token} = req.cookies
    
    // if (!authHeader || !authHeader.startsWith('Bearer')) return res.status(403).send("resourse not allowed")
    if (!token ) return res.status(403).json({success:false,message:"resourse not allowed"})
    // const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.log(error)
    }

}