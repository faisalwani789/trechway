import { Router } from "express";
import { getFeed,addPost } from "../Controllers/feed.controller.js";
import { postValidator } from "../middlewares/validation.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import { configDotenv } from "dotenv";
import { checkDailyLimit } from "../middlewares/dailyLimit.post.middleware.js";
configDotenv('../../.env')

const router=Router()

router.get('/',getFeed)
router.post("/create",checkDailyLimit(3),upload.array('images',10),postValidator,addPost)

export default router