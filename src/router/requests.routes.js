import { Router } from "express";
import { ConnRequest } from "../Controllers/request.controller.js";
const router=Router()
router.post("/:status/:userId",ConnRequest)

export default router