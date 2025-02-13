import { permissionsSchema } from '../../data/mongodb/models/system-user.model';
export class SystemUserEntity {

     constructor(
          public id: string,
          public email: string,
          public password: string,
          public address?: String,
          public firstName?: string,
          public lastName?: string,
          public phoneNumber?: string,
          public imageProfilePath?: string,
          public city?: string,
          public zipcode?: Number,
          public lockoutEnabled?: Boolean,
          public accessFailedCount?: Number,
          public birthDate?: Date,
          public roles?: [String],
          public permissions?: [typeof permissionsSchema]
     ) { }

}