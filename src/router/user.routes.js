import { Router } from "express";
import { addUser, getUser } from "../Controllers/user.controller.js";
const router=Router()
router.get("/user",getUser)
router.post("/user",addUser)
export default router