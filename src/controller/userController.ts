import { UserRepository } from "../Repository/userRepository.js";
import { Request, Response } from "express";
import { UserUsecase } from "../usecases/UserUsecase.js";
import { UserDtos } from "../Dtos/userDtos.js";

const UserRepo = new UserRepository();
const Userusecase = new UserUsecase(UserRepo);

export class UserController {
  async CreateUser(req: Request, res: Response) {
    try {
      const data: UserDtos = req.body;
      const firebaseUser = req.User!;
      const firebaseUid = firebaseUser.uid;
      const createUser = await Userusecase.CreateUser(data, firebaseUid);
      return res.status(201).json(createUser);
    } catch (error) {
      console.error("User registration  error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async UpdateUser(req: Request, res: Response) {
    try {
      const data: UserDtos = req.body;
      const firebaseUser = req.User!;
      const firebaseUid = firebaseUser.uid;
      const updateUSer = await Userusecase.UpdateUserUSecase(data, firebaseUid);
      return res.status(201).json(updateUSer);
    } catch (error) {
      console.error("User update  error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async FindAll(res: Response) {
    try {
      const Findall = await Userusecase.FindAll();
      return res.status(201).json(Findall);
    } catch (error) {
      console.error("User FindAll  error:", error);
      return res.status(500).json({
        message: "Internal server Error",
      });
    }
  }
  async DeleteUser(req: Request, res: Response) {
    try {
      const firebaseUser = req.User!;
      const firebaseUid = firebaseUser.uid;
      const Delete = await Userusecase.DeleteUser(firebaseUid);
      return res.status(201).json(Delete);
    } catch (error) {
      console.error("User Delete  error:", error);
      return res.status(500).json({
        message: "Internal server Error",
      });
    }
  }
  async GetProfile(req: Request, res: Response) {
    try {
      const firebaseUser = req.User!;
      const firebaseUid = firebaseUser.uid;
      const GetProfile = await Userusecase.getProfile(firebaseUid);
      return res.status(201).json(GetProfile);
    } catch (error) {
      console.error("User get Profile", error);
      return res.status(500).json({
        message: "Internal server Error",
      });
    }
  }
  async checkContact(req: Request, res: Response) {
    try {
      const { phoneNumbers } = req.body;
      if (!phoneNumbers || !Array.isArray(phoneNumbers)) {
        return res
          .status(400)
          .json({ message: "Invalid input. 'phoneNumbers' must be an array." });
      }
      const checkContact = await Userusecase.checkContact(phoneNumbers);
      return res.status(201).json(checkContact);
    } catch (error) {
      console.error("check-contact error", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

// import {
//   CreateUserDto,
//   userResponseDto,
//   RequestOtpDto,
//   UpdateUserDto,
// } from "../Dtos/userDtos.js";

// const UserRepo = new UserRepository();
// const UserUsecase = new Userusecase(UserRepo);

// export class UserController {
//   async createUser(req: Request, res: Response) {
//     try {
//       const data: CreateUserDto = req.body;
//       const createUser = await UserUsecase.CreateUser(data);
//       return res.status(201).json(createUser);
//     } catch (error) {
//       console.error("Error during create USer", error);
//       res.status(500).json({ message: "internal service error" });
//     }
//   }
//   async updateUser(req: Request, res: Response) {
//     try {
//       const data: UpdateUserDto = req.body;
//       const { userId } = req.params;
//       const update = await UserUsecase.UpdateUser(userId, data);
//       return res.status(201).json(update);
//     } catch (error) {
//       console.error("Error during update user", error);
//       res.status(500).json({ message: "internal service error" });
//     }
//   }
//   async getUserById(req: Request, res: Response) {
//     try {
//       const { userId } = req.params;
//       const getUserById = await UserUsecase.GetUserById(userId);
//       return res.status(201).json(getUserById);
//     } catch (error) {
//       console.error("Error during get UserById", error);
//       res.status(500).json({ message: "internal service error" });
//     }
//   }
//   async getAllUser(req: Request, res: Response) {
//     try {
//       const getAllUser = await UserUsecase.GetAllUser();
//       return res.status(201).json(getAllUser);
//     } catch (error) {
//       console.error("Error during Get All User", error);
//       res.status(500).json({ message: "internal service error" });
//     }
//   }
//   async DeleteUser(req: Request, res: Response) {
//     try {
//       const { userId } = req.params;
//       const deleteUSer = await UserUsecase.DeleteUser(userId);
//       return res.status(201).json(deleteUSer);
//     } catch (error) {}
//   }

// }
