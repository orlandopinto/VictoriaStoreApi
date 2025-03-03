import { PermissionsByRole } from "../../types";

export class GetPermissionsByRoleDto {
     constructor(
          public permissionsByRole: PermissionsByRole[]
     ) { }

     static get(object: { [key: string]: PermissionsByRole[] }): [string?, GetPermissionsByRoleDto?] {
          const { permissionsByRole } = object;
          return [
               undefined,
               new GetPermissionsByRoleDto(permissionsByRole)
          ];
     }

} 0