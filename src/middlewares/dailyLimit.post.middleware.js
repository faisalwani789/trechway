
import PostActivity from "../Models/post.activity.model.js"
//we can add type as another param also add type in post.activity ,and apply middleware for comments,posts like a variable 
export function checkDailyLimit(limit) {
    return async (req, res, next) => {
        const { id } = req.user
        const today = new Date().toISOString().slice(0, 10)
        try {
            const result = await PostActivity.findOneAndUpdate({
                userId: id,
                date: today,
                dailyCount: { $lt: limit }
            },
                {
                    $inc: { dailyCount: 1 }
                },
                {
                    new: true,
                    upsert: false,
                }
            )
            if (result) return next()
            const existing = await PostActivity.findOne({ userId:id, date: today })
            if (existing) return res.status(429).send('daily Limit reached')

            //if no existing create one for the user
            await PostActivity.create({
                userId:id,
                date: today,
                count: 1
            })
            return next()
        } catch (error) {
            res.status(429).send(error.message)
        }
    }
}
