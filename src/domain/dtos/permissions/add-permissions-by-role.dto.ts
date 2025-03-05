import { PermissionsByRole, Role, UsersByRole } from "../../types";

export class AddPermissionsByRoleDto {
     constructor(
          public role: Role,
          public permissionsByRole: PermissionsByRole[],
          public usersByRole: UsersByRole[]
     ) { }

     static create(object: { [key: string]: any }): [string?, AddPermissionsByRoleDto?] {
          const { role, permissionsByRole, usersByRole } = object;
          // ********* VALIDAR TODOS LOS CAMPOS QUE SON OBLIGATORIOS *********
          if (!role) return ['Missing role on create permission']
          if (!permissionsByRole) return ['Missing permissionsByRole on create permission']
          if (!usersByRole) return ['Missing usersByRole on create permission']
          // ********************** FIN DE LA VALIDACIÓN *********************
          return [
               undefined,
               new AddPermissionsByRoleDto(role, permissionsByRole, usersByRole)
          ];
     }

}