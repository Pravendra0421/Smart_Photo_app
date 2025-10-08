export interface OnboardingEntity {
  id: string;
  order: number;
  title: string;
  subTitle?: string;
  MainTitle?: string;
  imageUrl?: string;
  bgUrl?: string;
  buttonText: string;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
