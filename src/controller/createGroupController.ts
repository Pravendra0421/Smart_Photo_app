import { Request, Response } from "express";
import { createGroupDtos } from "../Dtos/GroupDtos.js";
import { CreateGroupRepo } from "../Repository/createGroupRepository.js";
import { CreateGroupUsecase } from "../usecases/createGroupUsecase.js";
import { UserRepository } from "../Repository/userRepository.js";

const createRepo = new CreateGroupRepo();
const userRepo = new UserRepository();
const createGroupusecase = new CreateGroupUsecase(createRepo, userRepo);

export class CreateGroupController {
  async createGroup(req: Request, res: Response) {
    try {
      const data: createGroupDtos = req.body;
      const firebaseUser = req.User!;
      const firebaseUid = firebaseUser?.uid;
      const createGroup = await createGroupusecase.createGroup(
        data,
        firebaseUid
      );
      return res.status(201).json(createGroup);
    } catch (error) {
      console.error("Create Group error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async GetAllGroup(req: Request, res: Response) {
    try {
      const firebaseUser = req.User!;
      const firebaseUid = firebaseUser?.uid;
      const GetAllGroup = await createGroupusecase.getAllGroup(firebaseUid);
      return res.status(201).json(GetAllGroup);
    } catch (error) {
      console.error("Get All Group error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async GetGroupById(req: Request, res: Response) {
    try {
      const { groupId } = req.params;
      const firebaseUser = req.User!;
      const firebaseUid = firebaseUser?.uid;
      const GetGroupById = await createGroupusecase.GetByGroupId(
        firebaseUid,
        groupId
      );
      return res.status(201).json(GetGroupById);
    } catch (error) {
      console.error("Get Group By Id error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
