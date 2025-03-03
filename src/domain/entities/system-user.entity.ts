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
          public imageProfilePath?: string,
          public city?: string,
          public zipcode?: number,
          public lockoutEnabled?: boolean,
          public accessFailedCount?: number,
          public birthDate?: Date,
          public roles?: string[],
          public isActive?: boolean
     ) { }

}

export class EnvironmentSystemUserEntity {

     constructor(
          public token: string,
          public userData: userData
     ) { }

}