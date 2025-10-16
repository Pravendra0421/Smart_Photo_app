import { GroupMembershipController } from "../controller/groupMembershipController.js";
import { Router } from "express";
import { AuthMiddleware } from "../middleware/authMiddleware.js";
const router = Router();
const groupMembershipController = new GroupMembershipController();
router.post("/add", AuthMiddleware, groupMembershipController.AddMember);
router.delete(
  "/delete",
  AuthMiddleware,
  groupMembershipController.DeleteMembership
);
router.get(
  "/all",
  AuthMiddleware,
  groupMembershipController.GetAllMemberByUser
);
router.get(
  "/:groupId",
  AuthMiddleware,
  groupMembershipController.GetAllMemberInGroup
);
export default router;
