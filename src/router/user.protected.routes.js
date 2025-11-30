import { Router } from "express";
import { addUser, getUser, signIn,updateUser } from "../Controllers/user.controller.js";
const router=Router()

router.get("/:id",getUser)
router.patch("/update",updateUser)
export default router