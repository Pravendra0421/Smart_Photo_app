import { IGroupMemberRepository } from "../Repository/AddGroupMember.js";
import { GroupMemberShipEntity } from "../entity/GroupEntity.js";
import { IcreateGroupRepository } from "../Repository/createGroupRepository.js";
import { IUserRepository } from "../Repository/userRepository.js";
export class GroupMemberShipUsecase {
  constructor(
    private GroupMemberRepository: IGroupMemberRepository,
    private GroupRepository: IcreateGroupRepository,
    private UserRepository: IUserRepository
  ) {}

  async AddMember(
    firebaseUid: string,
    uCode: string
  ): Promise<GroupMemberShipEntity> {
    const existingUser = await this.UserRepository.findByFirebaseId(
      firebaseUid
    );
    if (!existingUser) {
      throw new Error("user doesnot exist please login");
    }
    const userId = existingUser.id;
    const existingGroup = await this.GroupRepository.findGroupByUcode(uCode);
    if (!existingGroup) {
      throw new Error("Group doesnot exist please provide the valid UCode");
    }
    const groupId = existingGroup.id;
    const existingMemberShip =
      await this.GroupMemberRepository.getAllMembershipByUserid_GroupId(
        userId,
        groupId
      );
    if (existingMemberShip) {
      throw new Error("You are already member of this group");
    }
    const newMember = await this.GroupMemberRepository.addMember(
      userId,
      groupId
    );
    return newMember;
  }
  async DeleteMember(groupMembershipId: string): Promise<void> {
    const deletemember = await this.GroupMemberRepository.DeleteMember(
      groupMembershipId
    );
    return deletemember;
  }
  async GetAllMember(groupId: string): Promise<GroupMemberShipEntity[]> {
    const AllmemberInGroup =
      await this.GroupMemberRepository.getAllMemberInGroup(groupId);
    return AllmemberInGroup;
  }
  async GetAllMemberByUserId(
    firebaseUid: string
  ): Promise<GroupMemberShipEntity[]> {
    const existingUser = await this.UserRepository.findByFirebaseId(
      firebaseUid
    );
    if (!existingUser) {
      throw new Error("user doesnot exist please login");
    }
    const userId = existingUser.id;
    const GetMembership =
      await this.GroupMemberRepository.GetMembershipByuserId(userId);
    return GetMembership;
  }
  async addMultipleMembers(
    firebaseUid: string,
    groupId: string,
    userIdsToAdd: string[]
  ) {
    if (!groupId || !Array.isArray(userIdsToAdd) || userIdsToAdd.length === 0) {
      throw new Error(
        "Invalid input. 'groupId' and 'userIdsToAdd' (array) are required."
      );
    }
    const existingUser = await this.UserRepository.findByFirebaseId(
      firebaseUid
    );
    if (!existingUser) {
      throw new Error("user doesnot exist please login");
    }
    const userId = existingUser.id;
    const adminMembership =
      await this.GroupMemberRepository.getAllMembershipByUserid_GroupId(
        userId,
        groupId
      );
    if (!adminMembership || adminMembership.role !== "ADMIN") {
      throw new Error(
        "You do not have permission to add members to this group."
      );
    }
    const existingMembers =
      await this.GroupMemberRepository.findExistingMembers(
        groupId,
        userIdsToAdd
      );
    const existingUserIds = existingMembers.map((mem) => mem.userId);
    const newUserIdsToAdd = userIdsToAdd.filter(
      (id) => !existingUserIds.includes(id)
    );
    if (newUserIdsToAdd.length === 0) {
      return { message: "All users are already members.", count: 0 };
    }
    const result = await this.GroupMemberRepository.addMultipleMembersToGroup(
      groupId,
      newUserIdsToAdd
    );
    return {
      message: `Successfully added ${result.count} new members.`,
      count: result.count,
    };
  }
}
