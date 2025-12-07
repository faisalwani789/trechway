import { Router } from "express";
import { getFeed,addPost } from "../Controllers/feed.controller.js";
import { postValidator } from "../middlewares/validation.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import { configDotenv } from "dotenv";
configDotenv('../../.env')

const router=Router()

router.get('/',postValidator,getFeed)
router.post("/create",upload.array('images',10),addPost)

export default router