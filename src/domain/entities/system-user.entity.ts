export class SystemUserEntity {

     constructor(
          public id: string,
          public userName: string,
          public email: string,
          public password: string,
          public firstName?: string,
          public lastName?: string,
          public phoneNumner?: string,
          public imageProfilePath?: string,
          public city?: string,
          public zipcode?: Number,
          public lockoutEnabled?: Boolean,
          public accessFailedCount?: Number,
          public address?: String,
          public birthDate?: Date,
          public roles?:[String]
     ) { }

}