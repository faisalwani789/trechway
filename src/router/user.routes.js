import { Router } from "express";
import { ViewConnections,ViewRequests,RecommendedConnections } from "../Controllers/user.controller.js";
const router=Router()
router.get("/connection/requests",ViewRequests)//received requests only 
router.get("/connections",ViewConnections)
router.get('/connection/recomendations',RecommendedConnections)


export default router