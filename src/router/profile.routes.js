import { Router } from "express";
import { updateProfile,getProfile } from "../Controllers/profile.controller.js";
const router=Router()

router.get("/",getProfile)
router.patch("/update",updateProfile)
export default router