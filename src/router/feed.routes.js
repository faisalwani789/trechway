import { Router } from "express";
import { getFeed } from "../Controllers/feed.controller";
const router=Router()

router.get('/',getFeed)

export default router