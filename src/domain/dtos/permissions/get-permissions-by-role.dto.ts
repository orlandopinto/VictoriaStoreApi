import { permissionsByRoleSchema } from "../../../data/mongodb";

export class GetPermissionsByRoleDto {
     constructor(
          public permissionsByRole: [typeof permissionsByRoleSchema][]
     ) { }

     static get(object: { [key: string]: any }): [string?, GetPermissionsByRoleDto?] {
          const { permissionsByRole } = object;
          return [
               undefined,
               new GetPermissionsByRoleDto(permissionsByRole)
          ];
     }

}