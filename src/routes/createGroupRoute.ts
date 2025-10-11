import { Router } from "express";
import { CreateGroupController } from "../controller/createGroupController.js";
import { AuthMiddleware } from "../middleware/authMiddleware.js";
const router = Router();
const createGroupController = new CreateGroupController();
router.post("/create", AuthMiddleware, createGroupController.createGroup);
router.get("/getAll", AuthMiddleware, createGroupController.GetAllGroup);
router.get("/:groupId", AuthMiddleware, createGroupController.GetGroupById);
export default router;
