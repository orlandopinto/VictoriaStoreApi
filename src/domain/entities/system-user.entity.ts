export class SystemUserEntity {

     constructor(
          public id: string,
          public userName: string,
          public email: string,
          public password: string,
          public address: String,
          public firstName?: string,
          public lastName?: string,
          public phoneNumber?: string,
          public imageProfilePath?: string,
          public city?: string,
          public zipcode?: Number,
          public lockoutEnabled?: Boolean,
          public accessFailedCount?: Number,
          public birthDate?: Date,
          public roles?: [String]
     ) { }

}