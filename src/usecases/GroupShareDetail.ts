import { IGroupMemberRepository } from "../Repository/AddGroupMember.js";
import { IUserRepository } from "../Repository/userRepository.js";
import { IcreateGroupRepository } from "../Repository/createGroupRepository.js";
import qrcode from "qrcode";
export class ShareDetailUsecase {
  constructor(
    private GroupMemberShipRepo: IGroupMemberRepository,
    private userRepo: IUserRepository,
    private groupRepo: IcreateGroupRepository
  ) {}
  async getShareDetail(firebaseUid: string, groupId: string) {
    const existingUser = await this.userRepo.findByFirebaseId(firebaseUid);
    if (!existingUser) {
      throw new Error(" User doesnot exist please login");
    }
    const userId = existingUser.id;
    const existingMemberShip =
      await this.GroupMemberShipRepo.GetMembershipByuserId(userId, groupId);
    if (!existingMemberShip) {
      throw new Error("this member is not in this group ");
    }
    const group = await this.groupRepo.getById(groupId);
    const uCode = group?.uCode!;
    const qrCodeDetail = await qrcode.toDataURL(uCode);
    const shareDetails = {
      groupLink: `https://futureLink.com.link/join?code=${uCode}`, // Ek example deep link
      uCode: uCode,
      qrCode: qrCodeDetail,
    };
    return shareDetails;
  }
}
