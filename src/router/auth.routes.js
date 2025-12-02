import { Router } from "express";
import { addUser, signIn,logout } from "../Controllers/auth.controller.js";
import { loginValidator,registerValidator } from "../middlewares/validation.middleware.js"
const router=Router()

router.post("/",registerValidator,addUser)
router.post('/signIn',loginValidator,signIn)
router.get('/logout',logout)
export default router