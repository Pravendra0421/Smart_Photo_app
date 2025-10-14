import { ShareDetailUsecase } from "../usecases/GroupShareDetail.js";
import { Request, Response } from "express";
import { UserRepository } from "../Repository/userRepository.js";
import { GroupMembershipRepository } from "../Repository/AddGroupMember.js";
import { CreateGroupRepo } from "../Repository/createGroupRepository.js";
const userRepo = new UserRepository();
const groupRepo = new CreateGroupRepo();
const groupMemberRepo = new GroupMembershipRepository();
const shareDetailusecase = new ShareDetailUsecase(
  groupMemberRepo,
  userRepo,
  groupRepo
);
export class ShareDetailController {
  async getShareDetail(req: Request, res: Response) {
    try {
      const firebaseUSer = req.User!;
      const firebaseUid = firebaseUSer.uid;
      const { groupId } = req.params;
      const shareDetail = await shareDetailusecase.getShareDetail(
        firebaseUid,
        groupId
      );
      return res.status(201).json(shareDetail);
    } catch (error) {
      console.error("Error during the share detail");
      return res.status(401).json({
        message: "Error during share Detail",
      });
    }
  }
}
