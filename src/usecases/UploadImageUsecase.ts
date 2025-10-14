import { IUploadRepository } from "../Repository/uploadImage.js";
import { IUserRepository } from "../Repository/userRepository.js";
import { PhotoEntity } from "../entity/GroupEntity.js";
export class UploadImageUsecase {
  constructor(
    private UploadRepository: IUploadRepository,
    private UserRepository: IUserRepository
  ) {}
  async AddImage(
    firebaseUid: string,
    groupId: string,
    url: string
  ): Promise<PhotoEntity> {
    const existingUser = await this.UserRepository.findByFirebaseId(
      firebaseUid
    );
    if (!existingUser) {
      throw new Error("User doesnot exist please login");
    }
    const userId = existingUser.id;
    const addImage = await this.UploadRepository.AddImage(userId, groupId, url);
    return addImage;
  }
  async GetAllImageByGroupId(groupId: string): Promise<PhotoEntity[]> {
    const GetAllImageByGroupId =
      await this.UploadRepository.GetAllImageByGroupId(groupId);
    return GetAllImageByGroupId;
  }
  async GetAllImageByUserId(
    firebaseUid: string,
    groupId: string
  ): Promise<PhotoEntity[]> {
    const existingUser = await this.UserRepository.findByFirebaseId(
      firebaseUid
    );
    if (!existingUser) {
      throw new Error("User doesnot exist please login");
    }
    const userId = existingUser.id;
    const getAllImageByUserId = await this.UploadRepository.GetAllImageByUserId(
      userId,
      groupId
    );
    return getAllImageByUserId;
  }
  async DeleteImage(uploadImageId: string): Promise<void> {
    const DeleteImage = await this.UploadRepository.DeleteImage(uploadImageId);
    return DeleteImage;
  }
}
