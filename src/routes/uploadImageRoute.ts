import { UploadImageController } from "../controller/UploadImageController.js";
import { Router } from "express";
import { AuthMiddleware } from "../middleware/authMiddleware.js";
const uploadImagecontroller = new UploadImageController();
const router = Router();
router.post("/:groupId", AuthMiddleware, uploadImagecontroller.addImage);
router.get(
  "/getAll/:groupId",
  AuthMiddleware,
  uploadImagecontroller.GetAllImageByGroupId
);
router.get(
  "/:groupId",
  AuthMiddleware,
  uploadImagecontroller.GetAllImageByUserId
);
router.delete("/:id", AuthMiddleware, uploadImagecontroller.DeleteUploadImage);
export default router;
