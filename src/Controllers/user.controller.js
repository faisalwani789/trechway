import ConnectionRequest from "../Models/connection.request.model.js"
import User from '../Models/user.model.js'
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

export const RecommendedConnections=async(req,res)=>{
    const{cursor,limit}=req.query
    const{id}=req.user
    const query={}
    const conns=new Set()
    let nextCursor=null
    try {
        if(cursor){
            query._id={$lt:cursor}
        }
        const UserConnections=await ConnectionRequest.find({$or:[
            {fromUserId:id},
            {toUserId:id}
        ]}).select('fromUserId toUserId')

        UserConnections.forEach(con=>{
            conns.add(con.fromUserId);
            conns.add(con.toUserId)
        })

        let recommendations=await User.find({
            $and:[
                { _id:{ $nin:Array.from(conns)}},
                {_id: {$ne:id}}
            ],
            ...query    
        }).sort({_id:-1}).limit(parseInt(limit)+1).select('userName _id profilePic')
        
        console.log(recommendations.length +limit)
        if(recommendations.length > limit){
            
            nextCursor=recommendations[limit]._id
            recommendations=recommendations.slice(0,limit)
        }
        res.status(200).json({recommendations,nextCursor})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:error.message})
        
    }
}