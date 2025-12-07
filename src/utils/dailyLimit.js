import Post from "../Models/post.model"

export const checkDailyLimit=async(userId)=>{
    const today=new Date()
    const startOfDay=new Date(today.setHours(0,0,0,0)) //w.r.t to server not user
    const result=await Post.findOneAndUpdate({
        author:userId,
        $or:[
            {lastReset:{$lt:startOfDay}}, //checks does user last saved post,before todays start of the day
            {dailyCount:{$lt:7}}
        ]
    },
    {
        $set:{
            lastReset:new Date()
        },
        $inc:{dailyCount:1}
    },
    {
        new:true,
        upsert:true
    }
)
if(!result || result.dailyCount>7){
    throw new Error("dail limit reached")
}
return result
}