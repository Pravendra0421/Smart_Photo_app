import { Router } from "express";
import { OnboardingController } from "../controller/OnboardingController.js";
const router = Router();
const routerController = new OnboardingController();
router.post("/create", routerController.createOnboarding);
router.put("/:onboardingId", routerController.updateOnboarding);
router.get("/get", routerController.getOnboarding);
router.delete("/:onboardingId", routerController.deleteOnboarding);
export default router;
