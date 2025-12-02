import { Router } from "express";
import { updateUser,getUser } from "../Controllers/profile.controller.js";
const router=Router()

router.get("/:id",getUser)
router.patch("/update",updateUser)
export default router