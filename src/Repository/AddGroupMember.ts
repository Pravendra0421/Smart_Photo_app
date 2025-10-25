import prisma from "../../lib/prisma.js";
import { GroupMemberShipEntity } from "../entity/GroupEntity.js";

export interface IGroupMemberRepository {
  addMember(userId: string, groupId: string): Promise<GroupMemberShipEntity>;
  DeleteMember(id: string): Promise<void>;
  GetMembershipByuserId(userId: string): Promise<GroupMemberShipEntity[]>;
  getAllMemberInGroup(groupId: string): Promise<GroupMemberShipEntity[]>;
  getAllMembershipByUserid_GroupId(
    userId: string,
    groupId: string
  ): Promise<GroupMemberShipEntity | null>;
}
export class GroupMembershipRepository implements IGroupMemberRepository {
  async addMember(
    userId: string,
    groupId: string
  ): Promise<GroupMemberShipEntity> {
    const newMemeber = await prisma.groupMembership.create({
      data: {
        userId: userId,
        groupId: groupId,
      },
      include: {
        group: true,
        user: true,
      },
    });
    return newMemeber;
  }
  async DeleteMember(id: string): Promise<void> {
    await prisma.groupMembership.delete({
      where: { id },
    });
  }
  async getAllMemberInGroup(groupId: string): Promise<GroupMemberShipEntity[]> {
    const getAllMember = await prisma.groupMembership.findMany({
      where: { groupId },
      include: {
        user: true,
        group: true,
      },
    });
    return getAllMember;
  }
  async GetMembershipByuserId(
    userId: string
  ): Promise<GroupMemberShipEntity[]> {
    const FetchMemberShiip = await prisma.groupMembership.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
        group: true,
      },
    });
    return FetchMemberShiip;
  }
  async getAllMembershipByUserid_GroupId(
    userId: string,
    groupId: string
  ): Promise<GroupMemberShipEntity | null> {
    const FetchMember = await prisma.groupMembership.findFirst({
      where: { userId, groupId },
      include: {
        user: true,
        group: true,
      },
    });
    return FetchMember;
  }
}
