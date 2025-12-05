import ConnectionRequest from "../Models/connection.request.model.js"
export const ViewRequests=async(req,res)=>{
    const{id}=req.user
    try {
        const PendingRequests=await ConnectionRequest.find({toUserId:id,status:'interested'}).select('-toUserId -createdAt -updatedAt').populate('fromUserId','userName, profilePic')
        res.status(200).json({PendingRequests})
        
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}
export const ViewConnections=async(req,res)=>{
    const{id}=req.user
    try {
        const requests= await ConnectionRequest.find({$or:[
            {toUserId:id,status:'accepted'},//send by others to the logged in user
            {fromUserId:id,status:'accepted'}//send by the logged in user
        ]}).populate('toUserId','name profilePic').populate('fromUserId','name profilePic') // this will send populated version of both sender and receiver but in real we need data of other member not logged in, 
        
        const filteredRequest=requests.map(req=>{
            if(req.fromUserId.equals(id)){
                return req.toUserId
            }
            else{
                return req.fromUserId
            }
        })
        
        res.status(200).json(filteredRequest)
    } catch (error) {
         res.status(500).json({success:false,message:error.message})
    }
}