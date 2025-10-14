import { PhotoEntity } from "../entity/GroupEntity.js";
import prisma from "../../lib/prisma.js";
export interface IUploadRepository {
  AddImage(
    uploadedById: string,
    groupId: string,
    url: string
  ): Promise<PhotoEntity>;
  GetAllImageByGroupId(groupId: string): Promise<PhotoEntity[]>;
  GetAllImageByUserId(userId: string, groupId: string): Promise<PhotoEntity[]>;
  DeleteImage(id: string): Promise<void>;
}
export class uploadRepository implements IUploadRepository {
  async AddImage(
    uploadedById: string,
    groupId: string,
    url: string
  ): Promise<PhotoEntity> {
    const addImage = await prisma.photo.create({
      data: {
        url: url,
        uploadedById: uploadedById,
        groupId: groupId,
      },
    });
    return addImage as PhotoEntity;
  }
  async GetAllImageByGroupId(groupId: string): Promise<PhotoEntity[]> {
    const GetAllImageByGroupId = await prisma.photo.findMany({
      where: { groupId },
    });
    return GetAllImageByGroupId as PhotoEntity[];
  }
  async GetAllImageByUserId(
    userId: string,
    groupId: string
  ): Promise<PhotoEntity[]> {
    const GetAllImageByuserId = await prisma.photo.findMany({
      where: { uploadedById: userId, groupId },
    });
    return GetAllImageByuserId as PhotoEntity[];
  }
  async DeleteImage(id: string): Promise<void> {
    await prisma.photo.delete({
      where: { id: id },
    });
  }
}
