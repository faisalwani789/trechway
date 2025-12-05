import ConnectionRequest from "../Models/connection.request.model.js"
import User from "../Models/user.model.js"
export const ConnRequest = async (req, res) => {
    const{userId,status}=req.params
    const {id}=req.user
    const allowedChanges=['interested']

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
        if(connExists)return res.status(400).json({message:'connection request already exists',connExists})

        const request=new ConnectionRequest({toUserId:userId,fromUserId:id,status})
        const data= await request.save()
        res.status(201).json({ success: true, message: 'connection request sent',data })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
export const ReviewConnRequest=async (req,res)=>{
     const{requestId,status}=req.params
    const {id}=req.user
    const allowedChanges=['accepted','rejected']

    try {
       
        //validate the status send by user
        const validChange=allowedChanges.includes(status)
        if(!validChange)throw new Error("changes not allowed")
        
         //validate the requestId
        const request=await ConnectionRequest.findOne({_id:requestId,toUserId:id,status:'interested'})
        if(!request) return res.status(404).json({message:'no request found'})
        
        request.status=status //after successfull validations change the status as provided by the user
        const updatedRequest=await request.save()

        res.status(201).json({success:true,message:`request ${status} successfully`,updatedRequest})


        }
    catch(error){
        res.status(500).json({success:false,message:error.message})
    }

}