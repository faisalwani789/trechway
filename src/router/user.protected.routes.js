import { Router } from "express";
import { addUser, getUser, signIn } from "../Controllers/user.controller.js";
const router=Router()

router.get("/:id",getUser)

export default router