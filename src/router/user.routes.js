import { Router } from "express";
import { ViewConnections,ViewRequests } from "../Controllers/user.controller.js";
const router=Router()
router.get("/connection/requests",ViewRequests)//received requests only 
router.get("/connections",ViewConnections)


export default router