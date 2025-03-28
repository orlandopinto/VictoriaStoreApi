import { userData } from "../types";

export class SystemUserEntity {

     constructor(
          public id: string,
          public email: string,
          public password: string,
          public address?: string,
          public firstName?: string,
          public lastName?: string,
          public phoneNumber?: string,
          public public_id?: string,
          public secure_url?: string,
          public city?: string,
          public zipcode?: number,
          public lockoutEnabled?: boolean,
          public accessFailedCount?: number,
          public birthDate?: Date,
          public roles?: string[],
          public isActive?: boolean,
          public createdAt?: string,
          public updatedAt?: string
     ) { }

}

export class UpdateSystemUserEntity {

     constructor(
          public id: string,
          public address?: string,
          public firstName?: string,
          public lastName?: string,
          public phoneNumber?: string,
          public public_id?: string,
          public secure_url?: string,
          public city?: string,
          public zipcode?: number,
          public lockoutEnabled?: boolean,
          public accessFailedCount?: number,
          public birthDate?: Date,
          public roles?: string[],
          public isActive?: boolean,
          public createdAt?: string,
          public updatedAt?: string
     ) { }

}

export class EnvironmentSystemUserEntity {

     constructor(
          public accessToken: string,
          public refreshToken: string,
          public userData: userData
     ) { }

}

export class RefreshTokenEntity {

     constructor(
          public email: string,
          public accessToken: string,
          public refreshToken: string
     ) { }

}

export class ChangePasswordEntity {

     constructor(
          public email: string,
          public newPasswod: string,
     ) { }

}