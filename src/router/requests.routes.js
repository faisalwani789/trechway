import { Router } from "express";
import { ConnRequest,ReviewConnRequest } from "../Controllers/request.controller.js";
const router=Router()
router.post("/:status/:userId",ConnRequest)
router.post('/:status/:requestId',ReviewConnRequest)

export default router