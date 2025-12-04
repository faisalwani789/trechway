import ConnectionRequest from "../Models/connection.request.model.js"
import User from "../Models/user.model.js"
export const ConnRequest = async (req, res) => {
    const{userId,status}=req.params
    const {id}=req.user
    const allowedChanges=['pending','rejected']
    
    
    try {
      
          const validChange=allowedChanges.includes(status)
        if(!validChange)throw new Error("changes not allowed")

        //to check if the userId of receiver is valid user or not
        const toUser=await User.findById(userId)
        if(!toUser) throw new Error('bad request')

        //preventing duplication of conn request and if we sent a conn req to b person, person b shoud not be able to send back
        const connExists=await ConnectionRequest.findOne({$or:[
            {toUserId:userId,fromUserId:id},
            {toUserId:id, fromUserId:userId}
        ]})
        if(connExists)return res.status(200).json({message:'connection request already exists',connExists})

        const request=new ConnectionRequest({toUserId:userId,fromUserId:id,status})
        const data= await request.save()
        res.status(200).json({ success: true, message: 'connection request sent',data })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}