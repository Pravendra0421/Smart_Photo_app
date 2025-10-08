import { OnboardingEntity } from "../entity/OnboardingEntity.js";
import { OnboardingScreenRepository } from "../Repository/OnboardingRepository.js";
import { OnboardingDtos } from "../Dtos/OnboardingDtos.js";

export class OnboardingUsecase {
  constructor(private OnboardingRepo: OnboardingScreenRepository) {}
  async createOnboarding(data: OnboardingDtos): Promise<OnboardingEntity> {
    const create = await this.OnboardingRepo.createOnboarding(data);
    return create;
  }
  async updateOnboarding(
    data: OnboardingDtos,
    OnboardingId: string
  ): Promise<OnboardingEntity> {
    const update = await this.OnboardingRepo.updateOnboarding(
      OnboardingId,
      data
    );
    return update;
  }
  async getOnboarding(): Promise<OnboardingEntity[]> {
    const get = await this.OnboardingRepo.getOnboarding();
    return get;
  }
  async deleteOnBoarding(OnBoardingId: string): Promise<void> {
    const deleteOn = await this.OnboardingRepo.deleteOnboarding(OnBoardingId);
    return deleteOn;
  }
}
