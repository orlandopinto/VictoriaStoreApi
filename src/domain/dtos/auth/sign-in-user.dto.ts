import { Validators } from "../../../config";
import { permissionsByUserSchema } from "../../../data/mongodb/models/system-user.model";

export class SignInUserDto {
     constructor(
          public email: string,
          public password: string,
          public address: string,
          public firstName: string,
          public lastName: string,
          public phoneNumber: string,
          public imageProfilePath: string,
          public city: string,
          public zipcode: number,
          public lockoutEnabled: boolean,
          public accessFailedCount: number,
          public birthDate: Date,
          public roles: string[],
          public permissionsByUser: [typeof permissionsByUserSchema]
     ) { }

     //WARNINGprimer argumento es el mensaje de error y el segundo argumento va a ser la instancia de DTO
     //NOTE: lo de abajo es una Tupla
     static signIn(object: { [key: string]: any }): [string?, SignInUserDto?] {
          const { email, password, address, firstName, lastName, phoneNumber, imageProfilePath, city, zipcode, lockoutEnabled, accessFailedCount, birthDate, roles, permissionsByUser } = object;
          if (!email) return ['Missing email']
          if (!password) return ['Missing password']
          if (!Validators.email.test(email)) return ['Email is not valid']

          return [
               undefined,
               new SignInUserDto(email, password, address, firstName, lastName, phoneNumber, imageProfilePath, city, zipcode, lockoutEnabled, accessFailedCount, birthDate, roles, permissionsByUser)
          ];
     }

}
