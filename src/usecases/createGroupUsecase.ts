import { createGroupDtos } from "../Dtos/GroupDtos.js";
import { GroupEntity } from "../entity/GroupEntity.js";
import { IcreateGroupRepository } from "../Repository/createGroupRepository.js";
import { IUserRepository } from "../Repository/userRepository.js";

export class CreateGroupUsecase {
  constructor(
    private CreateGroupRepo: IcreateGroupRepository,
    private UserRepository: IUserRepository
  ) {}

  async createGroup(
    data: createGroupDtos,
    firebaseUid: string
  ): Promise<GroupEntity> {
    const existingUser = await this.UserRepository.findByFirebaseId(
      firebaseUid
    );
    if (!existingUser) {
      throw new Error("please signup or login user does not exist");
    }
    const userId = existingUser.id;
    const creategrp = await this.CreateGroupRepo.createGroup(data, userId);
    return creategrp;
  }
}
