import { OnboardingDtos } from "../Dtos/OnboardingDtos.js";
import { OnboardingEntity } from "../entity/OnboardingEntity.js";
import prisma from "../../lib/prisma.js";

export interface IOnboardingRepository {
  createOnboarding(data: OnboardingDtos): Promise<OnboardingEntity>;
  updateOnboarding(
    onboardingId: string,
    data: OnboardingDtos
  ): Promise<OnboardingEntity>;
  getOnboarding(): Promise<OnboardingEntity[]>;
  deleteOnboarding(onboardingId: string): Promise<void>;
}

export class OnboardingScreenRepository implements IOnboardingRepository {
  async createOnboarding(data: OnboardingDtos): Promise<OnboardingEntity> {
    const create = await prisma.onboardingScreen.create({
      data: {
        ...data,
      },
    });
    return create as OnboardingEntity;
  }
  async updateOnboarding(
    onboardingId: string,
    data: OnboardingDtos
  ): Promise<OnboardingEntity> {
    const update = await prisma.onboardingScreen.update({
      where: { id: onboardingId },
      data: {
        ...data,
      },
    });
    return update as OnboardingEntity;
  }
  async getOnboarding(): Promise<OnboardingEntity[]> {
    const getOnboarding = await prisma.onboardingScreen.findMany({});
    return getOnboarding as OnboardingEntity[];
  }
  async deleteOnboarding(onboardingId: string): Promise<void> {
    await prisma.onboardingScreen.delete({
      where: { id: onboardingId },
    });
  }
}
