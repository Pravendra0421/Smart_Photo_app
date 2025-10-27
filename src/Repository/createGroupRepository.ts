import { createGroupDtos } from "../Dtos/GroupDtos.js";
import { GroupEntity } from "../entity/GroupEntity.js";
import prisma from "../../lib/prisma.js";

export interface IcreateGroupRepository {
  createGroup(data: createGroupDtos, userId: string): Promise<GroupEntity>;
  getAllGroup(): Promise<GroupEntity[]>;
  getById(id: string): Promise<GroupEntity | null>;
  findGroupByUcode(uCode: string): Promise<GroupEntity | null>;
}
function generateUniqueCode(length = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
export class CreateGroupRepo implements IcreateGroupRepository {
  async createGroup(
    data: createGroupDtos,
    userId: string
  ): Promise<GroupEntity> {
    const newGroup = await prisma.$transaction(async (tx) => {
      const group = await tx.group.create({
        data: {
          name: data.name,
          privacyType: data.privacyType,
          imageUrl: data.imageUrl,
          uCode: generateUniqueCode(),
          ownerId: userId,
        },
      });
      await tx.groupMembership.create({
        data: {
          userId: userId,
          groupId: group.id,
          role: "ADMIN",
        },
      });
      return group;
    });
    return newGroup as GroupEntity;
  }
  async getAllGroup(): Promise<GroupEntity[]> {
    const getAll = await prisma.group.findMany({});
    return getAll;
  }
  async getById(id: string): Promise<GroupEntity | null> {
    const getById = await prisma.group.findFirst({
      where: { id },
      include: {
        photos: true,
        vidoes: true,
      },
    });
    return getById;
  }
  async findGroupByUcode(uCode: string): Promise<GroupEntity | null> {
    const findGroup = await prisma.group.findUnique({
      where: { uCode },
    });
    return findGroup;
  }
}
