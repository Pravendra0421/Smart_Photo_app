import { GroupMemberShipUsecase } from "../usecases/AddGroupMembership.js";
import { GroupMembershipRepository } from "../Repository/AddGroupMember.js";
import { UserRepository } from "../Repository/userRepository.js";
import { Request, Response } from "express";
import { CreateGroupRepo } from "../Repository/createGroupRepository.js";
const userRepo = new UserRepository();
const GroupRepo = new CreateGroupRepo();
const GroupMembershipRepo = new GroupMembershipRepository();
const groupmembershipusecase = new GroupMemberShipUsecase(
  GroupMembershipRepo,
  GroupRepo,
  userRepo
);
export class GroupMembershipController {
  async AddMember(req: Request, res: Response) {
    try {
      const firebaseUSer = req.User!;
      const firebaseUid = firebaseUSer.uid;
      const { uCode } = req.body;
      const newMember = await groupmembershipusecase.AddMember(
        firebaseUid,
        uCode
      );
      return res.status(201).json(newMember);
    } catch (error) {
      console.error("error during add new member", error);
      return res.status(500).json({
        message: "error during the add member",
      });
    }
  }
  async DeleteMembership(req: Request, res: Response) {
    try {
      const { groupMembershipId } = req.params;
      const deleteMember = await groupmembershipusecase.DeleteMember(
        groupMembershipId
      );
      return res.status(201).json(deleteMember);
    } catch (error) {
      console.error("Error during delete the mebership", error);
      return res.status(500).json({
        message: "during delete the groupmember",
      });
    }
  }
  async GetAllMemberInGroup(req: Request, res: Response) {
    try {
      const { groupId } = req.params;
      const GetAll = await groupmembershipusecase.GetAllMember(groupId);
      return res.status(201).json(GetAll);
    } catch (error) {
      console.error("Error during GetAll the mebership", error);
      return res.status(500).json({
        message: "during GetAll the groupmember",
      });
    }
  }
  async GetAllMemberByUser(req: Request, res: Response) {
    try {
      const firebaseUSer = req.User!;
      const firebaseUid = firebaseUSer.uid;
      const GetMembership = await groupmembershipusecase.GetAllMemberByUserId(
        firebaseUid
      );
      return res.status(201).json(GetMembership);
    } catch (error) {
      console.error("Error during GetAll the mebership", error);
      return res.status(500).json({
        message: "during GetAll the groupmember",
      });
    }
  }
}
