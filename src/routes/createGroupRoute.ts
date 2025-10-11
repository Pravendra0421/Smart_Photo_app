import { Router } from "express";
import { CreateGroupController } from "../controller/createGroupController.js";
import { AuthMiddleware } from "../middleware/authMiddleware.js";
const router = Router();
const createGroupController = new CreateGroupController();
router.post("/create", AuthMiddleware, createGroupController.createGroup);
export default router;
