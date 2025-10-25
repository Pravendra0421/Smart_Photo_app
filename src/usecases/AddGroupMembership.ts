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
}
