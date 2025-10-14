export interface GroupEntity {
  id: string;
  name: string;
  uCode: string;
  privacyType: "PERSONAL" | "PUBLIC";
  imageUrl: string;
  ownerId: string;
}

export interface GroupMemberShipEntity {
  id: string;
  userId: string;
  groupId: string;
  role: "ADMIN" | "MEMBER";
  createdAt: Date;
}
export interface PhotoEntity {
  id: string;
  url: string;
  uploadedById: string;
  groupId: string;
  createdAt: Date;
  updatedAt: Date;
}
