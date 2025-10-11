import { PrivacyType } from "./../../generated/prisma/index.js";

export interface createGroupDtos {
  name: string;
  privacyType: "PERSONAL" | "PUBLIC";
  imageUrl: string;
}
