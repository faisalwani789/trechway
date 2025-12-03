import ConnectionRequest from "../Models/connection.request.model.js"
export const ConnRequest = async (req, res) => {
    const{userId,status}=req.params
    console.log(userId)
    const {id}=req.user
    const allowedChanges=['pending','rejected']
    try {
          const validChange=allowedChanges.includes(status)
        if(!validChange)throw new Error("changes not allowed")
        const request=new ConnectionRequest({toUserId:userId,fromUserId:id,status})
        const data= await request.save()
        res.status(200).json({ success: true, message: 'connection request sent',data })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}