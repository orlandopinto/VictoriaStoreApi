import { PermissionsByRole, Role, UsersByRole } from "../../types";

export class UpdatePermissionsByRoleDto {
     constructor(
          public role: Role,
          public permissionsByRole: PermissionsByRole[],
          public usersByRole: UsersByRole[]
     ) { }

     static create(object: { [key: string]: any }): [string?, UpdatePermissionsByRoleDto?] {
          const { role, permissionsByRole, usersByRole } = object;
          // ********* VALIDAR TODOS LOS CAMPOS QUE SON OBLIGATORIOS *********
          if (!role) return ['Missing role on update permission']
          if (!permissionsByRole) return ['Missing permissionsByRole on update permission']
          if (!usersByRole) return ['Missing usersByRole on update permission']
          // ********************** FIN DE LA VALIDACIÓN *********************
          return [
               undefined,
               new UpdatePermissionsByRoleDto(role, permissionsByRole, usersByRole)
          ];
     }

}