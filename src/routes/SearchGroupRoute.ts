import { SearchController } from "../controller/SearchGroupController.js";
import { Router } from "express";
import { AuthMiddleware } from "../middleware/authMiddleware.js";
const searchcontroller = new SearchController();
const router = Router();
router.get("/group", searchcontroller.Search);
export default router;
