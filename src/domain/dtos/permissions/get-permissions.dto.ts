import { permissionsSchema } from "../../../data/mongodb";

export class GetPermissionsDto {
     constructor(
          public permissions: [typeof permissionsSchema][],
          public hasError: boolean | undefined,
          public errorMessage: string[]
     ) { }

     static get(object: { [key: string]: any }): [string?, GetPermissionsDto?] {
          const { permissions, hasError, errorMessage } = object;
          return [
               undefined,
               new GetPermissionsDto(permissions, hasError, errorMessage)
          ];
     }

}