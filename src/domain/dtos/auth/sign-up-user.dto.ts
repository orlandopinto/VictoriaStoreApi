import { Validators } from "../../../config";
import { permissionsSchema } from "../../../data/mongodb/models/system-user.model";

export class SignUpUserDto {

     private constructor(
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
          public permissions: [typeof permissionsSchema]
     ) { }

     //WARNING: primer argumento es el mensaje de error y el segundo argumento va a ser la instancia de DTO
     //NOTE: lo de abajo es una Tupla
     static create(object: { [key: string]: any }): [string?, SignUpUserDto?] {
          const { email, password, address, firstName, lastName, phoneNumber, imageProfilePath, city, zipcode, lockoutEnabled, accessFailedCount, birthDate, roles, permissions } = object;
          if (!email) return ['Missing email']
          if (!Validators.email.test(email)) return ['Email is not valid']
          if (!password) return ['Missing password']
          if (password.length < 6) return ['Password too short']

          return [
               undefined,
               new SignUpUserDto(email, password, address, firstName, lastName, phoneNumber, imageProfilePath, city, zipcode, lockoutEnabled, accessFailedCount, birthDate, roles, permissions)
          ];
     }
}