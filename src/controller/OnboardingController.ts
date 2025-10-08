import { Request, Response } from "express";
import { OnboardingDtos } from "../Dtos/OnboardingDtos.js";
import { OnboardingUsecase } from "../usecases/OnboadingUsecase.js";
import { OnboardingScreenRepository } from "../Repository/OnboardingRepository.js";
const OnBoardingRepo = new OnboardingScreenRepository();
const onboardingUsecase = new OnboardingUsecase(OnBoardingRepo);

export class OnboardingController {
  async createOnboarding(req: Request, res: Response) {
    try {
      const data: OnboardingDtos = req.body;
      const createOnboarding = await onboardingUsecase.createOnboarding(data);
      res.status(201).json(createOnboarding);
    } catch (error) {
      console.error("Error during create Onboarding", error);
      res.status(500).json({ message: "internal service error" });
    }
  }
  async updateOnboarding(req: Request, res: Response) {
    try {
      const data: OnboardingDtos = req.body;
      const { onboardingId } = req.params;
      const updateOnboarding = await onboardingUsecase.updateOnboarding(
        data,
        onboardingId
      );
      res.status(201).json(updateOnboarding);
    } catch (error) {
      console.error("Error during update Onboarding");
      res.status(500).json({ message: "Internal service Error" });
    }
  }
  async getOnboarding(req: Request, res: Response) {
    try {
      const getOnboarding = await onboardingUsecase.getOnboarding();
      res.status(201).json(getOnboarding);
    } catch (error) {
      console.error("Error during get Onboarding");
      res.status(500).json({
        message: "Internal Service Error",
      });
    }
  }
  async deleteOnboarding(req: Request, res: Response) {
    try {
      const { onboardingId } = req.params;
      const deleteOnboarding = await onboardingUsecase.deleteOnBoarding(
        onboardingId
      );
      res.status(201).json(deleteOnboarding);
    } catch (error) {
      console.error("Error during deleteOnboarding");
      res.status(500).json({
        message: "Internal service Error",
      });
    }
  }
}
