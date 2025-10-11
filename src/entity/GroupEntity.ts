import { PrivacyType } from "../../generated/prisma/index.js";
export interface GroupEntity {
  id: string;
  name: string;
  uCode: string;
  privacyType: "PERSONAL" | "PUBLIC";
  imageUrl: string;
  ownerId: string;
}
