import { Router } from "express";
import { getFeed } from "../Controllers/feed.controller.js";
import { postValidator } from "../middlewares/validation.middleware.js";
const router=Router()

router.get('/',postValidator,getFeed)

export default router