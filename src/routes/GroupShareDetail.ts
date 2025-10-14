import { ShareDetailController } from "../controller/GroupShareDetail.js";
import { Router } from "express";
import { AuthMiddleware } from "../middleware/authMiddleware.js";
const sharedetail = new ShareDetailController();
const router = Router();
router.get("/:groupId", AuthMiddleware, sharedetail.getShareDetail);
export default router;
