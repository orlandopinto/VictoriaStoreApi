import { permissionsSchema } from "../../data/mongodb";
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
          public permissions?: [typeof permissionsSchema][]
     ) { }

}

export class EnvironmentSystemUserEntity {

     constructor(
          public token: string,
          public email: string,
          public password: string,
          public userData: userData,
          public hasError: boolean,
          public errorMessages?: string[] | null
     ) { }

}

//NOTE: Se crea esta clase para excluir los campos email y password que eran necesarios para validar el usuario
export class EnvironmentSystemUserEntityResult {

     constructor(
          public token: string,
          public userData: userData,
     ) { }

}