import { permissionsSchema } from "../../../data/mongodb";

export class GetPermissionsDto {
     constructor(
          public permissions: [typeof permissionsSchema][]
     ) { }

     static get(object: { [key: string]: any }): [string?, GetPermissionsDto?] {
          const { permissions } = object;
          return [
               undefined,
               new GetPermissionsDto(permissions)
          ];
     }

}