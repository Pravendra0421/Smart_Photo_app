import { Request, Response } from "express";
import { UploadImageUsecase } from "../usecases/UploadImageUsecase.js";
import { uploadRepository } from "../Repository/uploadImage.js";
import { UserRepository } from "../Repository/userRepository.js";
const userRepo = new UserRepository();
const UploadRepo = new uploadRepository();
const uploadUsecase = new UploadImageUsecase(UploadRepo, userRepo);
export class UploadImageController {
  async addImage(req: Request, res: Response) {
    try {
      const { url } = req.body;
      console.log("ImageUrl is", url);
      const { groupId } = req.params;
      const firebaseUser = req.User!;
      const firebaseUid = firebaseUser?.uid;
      const addImage = await uploadUsecase.AddImage(firebaseUid, groupId, url);
      return res.status(201).json(addImage);
    } catch (error) {
      console.error("i got the error during addImage", error);
      return res.status(401).json({
        message: "Error during upload the image",
      });
    }
  }
  async GetAllImageByGroupId(req: Request, res: Response) {
    try {
      const { groupId } = req.params;
      const GetAll = await uploadUsecase.GetAllImageByGroupId(groupId);
      return res.status(201).json(GetAll);
    } catch (error) {
      console.error("Error during getAll the image through the groupId", error);
      return res.status(401).json({
        message: "Error during getAll the image through the groupId",
      });
    }
  }
  async GetAllImageByUserId(req: Request, res: Response) {
    try {
      const { groupId } = req.params;
      const firebaseUser = req.User!;
      const firebaseUid = firebaseUser?.uid;
      const GetAll = await uploadUsecase.GetAllImageByUserId(
        firebaseUid,
        groupId
      );
      return res.status(201).json(GetAll);
    } catch (error) {
      console.error("Error during getAll the image through the userId", error);
      return res.status(401).json({
        message: "Error during getAll the image through the userId",
      });
    }
  }
  async DeleteUploadImage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleteImage = await uploadUsecase.DeleteImage(id);
      return res.status(201).json(deleteImage);
    } catch (error) {
      console.error("Error during Delete the image", error);
      return res.status(401).json({
        message: "Error during delete the image ",
      });
    }
  }
}
