import prisma from "../../lib/prisma.js";
import { UserDtos } from "../Dtos/userDtos.js";
import { UserEntity } from "../entity/userEntity.js";

export interface IUserRepository {
  createUser(data: UserDtos): Promise<UserEntity>;
  updateUser(data: Partial<UserDtos>, id: string): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity>;
  findByFirebaseId(firebaseId: string): Promise<UserEntity>;
  findAllUser(): Promise<UserEntity[]>;
  DeleteUSer(id: string): Promise<void>;
  getMyProfile(uid: string): Promise<UserEntity>;
  checkContact(phoneNumbers: string[]): Promise<UserEntity[]>;
}
export class UserRepository implements IUserRepository {
  async createUser(data: UserDtos): Promise<UserEntity> {
    const createUSer = await prisma.userModel.create({
      data: {
        ...data,
      },
    });
    return createUSer as UserEntity;
  }

  async updateUser(data: Partial<UserDtos>, id: string): Promise<UserEntity> {
    const updateUser = await prisma.userModel.update({
      where: { id },
      data: {
        ...data,
      },
    });
    return updateUser as UserEntity;
  }
  async findById(id: string): Promise<UserEntity> {
    const findByFirebaseId = await prisma.userModel.findFirst({
      where: { id },
    });
    return findByFirebaseId as UserEntity;
  }
  async findAllUser(): Promise<UserEntity[]> {
    const FindAll = await prisma.userModel.findMany({});
    return FindAll as UserEntity[];
  }
  async findByFirebaseId(firebaseId: string): Promise<UserEntity> {
    const FindByPhone = await prisma.userModel.findFirst({
      where: { uid: firebaseId },
    });
    return FindByPhone as UserEntity;
  }
  async DeleteUSer(id: string): Promise<void> {
    await prisma.userModel.delete({
      where: { id },
    });
  }
  async getMyProfile(uid: string): Promise<UserEntity> {
    const getProfile = await prisma.userModel.findUnique({
      where: {
        uid,
      },
      include: {
        _count: {
          select: {
            uploadPhoto: true,
            uploadVideo: true,
          },
        },
      },
    });
    return getProfile as UserEntity;
  }
  async checkContact(phoneNumbers: string[]): Promise<UserEntity[]> {
    const checkContact = await prisma.userModel.findMany({
      where: {
        phoneNumber: {
          in: phoneNumbers,
        },
      },
    });
    return checkContact as UserEntity[];
  }
}
// import prisma from "../../lib/prisma.js";
// import { UserEntity } from "../entity/userEntity.js";
// import {
//   CreateUserDto,
//   UpdateUserDto,
//   LoginResponseDto,
// } from "../Dtos/userDtos.js";
// import * as jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET;
// const OTP_EXPIRES_MINUETES = 5;

// if (JWT_SECRET === null) {
//   throw new Error("JWT_SECRET environment variable is not defined");
// }
// export interface IUserRepository {
//   findAll(): Promise<UserEntity[]>;
//   findById(id: string): Promise<UserEntity | null>;
//   create(userData: CreateUserDto): Promise<UserEntity>;
//   update(id: string, userDate: Partial<UpdateUserDto>): Promise<UserEntity>;
//   deleteUser(id: string): Promise<void>;
//   findByEmail(email: string): Promise<UserEntity | null>;
//   requestOtp(email: string): Promise<{
//     user: UserEntity;
//     otp: string;
//   } | null>;
//   verifyOtpAndLogin(email: string, otp: string): Promise<LoginResponseDto>;
// }
// export class UserRepository implements IUserRepository {
//   async findAll(): Promise<UserEntity[]> {
//     const findAll = await prisma.userModel.findMany({});
//     return findAll as UserEntity[];
//   }
//   async findById(id: string): Promise<UserEntity | null> {
//     const findById = await prisma.userModel.findFirst({
//       where: { id: id },
//     });
//     return findById as UserEntity;
//   }
//   async create(userData: CreateUserDto): Promise<UserEntity> {
//     const createUser = await prisma.userModel.create({
//       data: {
//         ...userData,
//       },
//     });
//     return createUser as UserEntity;
//   }
//   async update(
//     id: string,
//     userDate: Partial<UpdateUserDto>
//   ): Promise<UserEntity> {
//     const updateUser = await prisma.userModel.update({
//       where: { id },
//       data: {
//         ...userDate,
//       },
//     });
//     return updateUser as UserEntity;
//   }
//   async deleteUser(id: string): Promise<void> {
//     await prisma.userModel.delete({
//       where: { id },
//     });
//   }
//   async findByEmail(email: string): Promise<UserEntity | null> {
//     const findByEmail = await prisma.userModel.findFirst({
//       where: { email },
//     });
//     return findByEmail as UserEntity;
//   }
//   async requestOtp(
//     email: string
//   ): Promise<{ user: UserEntity; otp: string } | null> {
//     try {
//       let user = await this.findByEmail(email);

//       // generate OTP
//       const otp = Math.floor(100000 + Math.random() * 900000).toString();
//       const otpExpiresAt = new Date(
//         Date.now() + OTP_EXPIRES_MINUETES * 60 * 1000
//       );

//       // if user doesn’t exist, create it first
//       if (!user) {
//         await prisma.userModel.create({
//           data: { email },
//         });
//       }

//       // update OTP for user
//       const updatedUser = await prisma.userModel.update({
//         where: { email },
//         data: { otp, otpExpiresAt },
//       });

//       return { user: updatedUser as UserEntity, otp };
//     } catch (error) {
//       console.error("Error in requestOtp:", error);
//       return null;
//     }
//   }
//   async verifyOtpAndLogin(
//     email: string,
//     otp: string
//   ): Promise<LoginResponseDto> {
//     const user = await this.findByEmail(email);
//     if (!user) {
//       console.error(`user not found for email ${email}`);
//       throw new Error("Invalid email or Otp");
//     }
//     if (!user.otp || !user.otpExpiresAt) {
//       console.error(`otp expiry missing for user : ${email}`);
//       throw new Error("Invalid email or otp");
//     }
//     if (user.otp !== otp) {
//       console.error(
//         `Provided OTP '<span class="math-inline">\{otp\}' does not match stored OTP '</span>{user.otp}' for user: ${email}`
//       );
//       throw new Error("Invalid OTP");
//     }
//     if (new Date() > user.otpExpiresAt) {
//       console.error(
//         `opt expired for user: ${email}. current time :${new Date()}, Expiry:${
//           user.otpExpiresAt
//         }`
//       );
//       await prisma.userModel.update({
//         where: { id: user.id },
//         data: { otp: null, otpExpiresAt: null },
//       });
//       throw new Error("otp expire please request a new one");
//     }
//     await prisma.userModel.update({
//       where: { id: user.id },
//       data: { otp: null, otpExpiresAt: null },
//     });
//     const token = jwt.sign(
//       {
//         id: user.id,
//         email: user.email,
//       },
//       JWT_SECRET as string,

//       { expiresIn: "1h" }
//     );
//     return { user, token };
//   }
// }
