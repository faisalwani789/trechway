import { Router } from "express";
import { updateProfile,getProfile, forgotPassword } from "../Controllers/profile.controller.js";
import { passwordValidator } from "../middlewares/validation.middleware.js";
const router=Router()

router.get("/",getProfile)
router.patch("/update",updateProfile)
router.patch('/password',passwordValidator,forgotPassword)
export default router