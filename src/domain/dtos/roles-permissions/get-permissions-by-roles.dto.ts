import { permissionsByRoleSchema } from "../../../data/mongodb";

export class GetPermissionsByRolesDto {
     constructor(
          public permissionsByRolesList: [typeof permissionsByRoleSchema]
     ) { }

     static get(object: { [key: string]: any }): [string?, GetPermissionsByRolesDto?] {
          const { permissionsByRolesList } = object;
          return [
               undefined,
               new GetPermissionsByRolesDto(permissionsByRolesList)
          ];
     }

}