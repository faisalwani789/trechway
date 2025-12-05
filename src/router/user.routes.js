import { Router } from "express";
import { ViewConnections } from "../Controllers/user.controller.js";
const router=Router()
router.get("/connections",ViewConnections)


export default router