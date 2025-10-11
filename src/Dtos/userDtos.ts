export interface UserDtos {
  email?: string;
  uid: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}

// export interface CreateUserDto {
//   email?: string;
//   phone?: string;
//   firstName?: string;
//   lastName?: string;
//   imageUrl?: string;
//   otp?: string;
//   otpExpiresAt?: Date;
// }
// export interface UpdateUserDto {
//   email?: string;
//   phone?: string;
//   firstName?: string;
//   lastName?: string;
//   imageUrl?: string;
// }
// export interface userResponseDto {
//   id: string;
//   firstName?: string;
//   lastName?: string;
//   email?: string;
//   phone?: string;
//   imageUrl?: string;
// }
// export interface RequestOtpDto {
//   email: string;
// }
// export interface LoginResponseDto {
//   token: string;
//   user: userResponseDto;
// }
