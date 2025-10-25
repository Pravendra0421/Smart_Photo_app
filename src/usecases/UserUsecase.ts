import { IUserRepository } from "../Repository/userRepository.js";
import { UserDtos } from "../Dtos/userDtos.js";
import { UserEntity } from "../entity/userEntity.js";

export class UserUsecase {
  constructor(private UserRepository: IUserRepository) {}

  async CreateUser(data: UserDtos, firebaseUid: string): Promise<UserEntity> {
    let existingUSer = await this.UserRepository.findByFirebaseId(firebaseUid);
    if (!existingUSer) {
      existingUSer = await this.UserRepository.createUser(data);
    }
    return existingUSer;
  }
  async UpdateUserUSecase(
    data: UserDtos,
    firebaseUid: string
  ): Promise<UserEntity> {
    const existingUSer = await this.UserRepository.findByFirebaseId(
      firebaseUid
    );
    if (!existingUSer) {
      throw new Error("user does not exists");
    }
    const userId = existingUSer.id;
    const update = await this.UserRepository.updateUser(data, userId);
    return update;
  }
  async FindAll(): Promise<UserEntity[]> {
    const FindAll = await this.UserRepository.findAllUser();
    return FindAll;
  }
  async DeleteUser(firebaseUid: string): Promise<void> {
    const existingUSer = await this.UserRepository.findByFirebaseId(
      firebaseUid
    );
    if (!existingUSer) {
      throw new Error("user does not exists");
    }
    const userId = existingUSer.id;
    const deleteUSer = await this.UserRepository.DeleteUSer(userId);
    return deleteUSer;
  }
  async getProfile(firebaseUid: string): Promise<UserEntity> {
    const getprofile = await this.UserRepository.getMyProfile(firebaseUid);
    return getprofile;
  }
}

// import { IUserRepository } from "../Repository/userRepository.js";
// import { UserEntity } from "../entity/userEntity.js";
// import {
//   CreateUserDto,
//   UpdateUserDto,
//   LoginResponseDto,
//   RequestOtpDto,
// } from "../Dtos/userDtos.js";

// export class Userusecase {
//   constructor(private userRepository: IUserRepository) {}

//   async CreateUser(data: CreateUserDto): Promise<UserEntity> {
//     const existingUSer = await this.userRepository.findByEmail(data.email!);
//     if (existingUSer) {
//       throw new Error("user with this email is already exist");
//     }
//     const newUser = await this.userRepository.create(data);
//     return newUser;
//   }
//   async GetAllUser(): Promise<UserEntity[]> {
//     const users = await this.userRepository.findAll();
//     return users;
//   }
//   async GetUserById(userId: string): Promise<UserEntity | null> {
//     const getUSerById = await this.userRepository.findById(userId);
//     return getUSerById;
//   }
//   async UpdateUser(
//     userId: string,
//     updateData: UpdateUserDto
//   ): Promise<UserEntity> {
//     const existingUser = await this.userRepository.findById(userId);
//     if (!existingUser) {
//       throw new Error("User not found");
//     }
//     if (updateData.email && updateData.email !== existingUser.email) {
//       const userWithNewEmail = await this.userRepository.findByEmail(
//         updateData.email
//       );
//       if (userWithNewEmail) {
//         throw new Error("Another user with this email already exist");
//       }
//     }
//     const updateUser = await this.userRepository.update(userId, updateData);
//     return updateUser;
//   }
//   async RequestOtp(requestData: RequestOtpDto): Promise<{
//     user: UserEntity;
//     otp: string;
//   }> {
//     const { email } = requestData;
//     const result = await this.userRepository.requestOtp(email);
//     if (!result) {
//       throw new Error(
//         "Failed to generate OTP. Please try again or contact support."
//       );
//     }
//     return result;
//   }
//   async verifyOtp(email: string, otp: string): Promise<LoginResponseDto> {
//     const verifyOtp = await this.userRepository.verifyOtpAndLogin(email, otp);
//     return verifyOtp;
//   }
//   async DeleteUser(userId: string) {
//     const deleteUser = await this.userRepository.deleteUser(userId);
//     return deleteUser;
//   }
// }
