import { Router } from "express";
import { addUser, getUser, signIn } from "../Controllers/user.controller.js";
import { loginValidator,registerValidator } from "../middlewares/validation.middleware.js"
const router=Router()

router.post("/",registerValidator,addUser)
router.post('/signIn',loginValidator,signIn)
export default router