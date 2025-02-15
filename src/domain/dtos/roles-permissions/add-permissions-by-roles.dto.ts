import { permissionsActionsSchema } from "../../../data/mongodb";

export class AddPermissionsByRoleDto {
     constructor(
          public permissionId: string,
          public roleName: string,
          public resourseName: string,
          public permissionActionsIds: [typeof permissionsActionsSchema],
     ) { }

     static create(object: { [key: string]: any }): [string?, AddPermissionsByRoleDto?] {
          const { permissionId, roleName, resourseName, permissionActionsIds } = object;
          if (!permissionId) return ['Missing permission id']
          if (!roleName) return ['Missing role name']
          if (!resourseName) return ['Missing resourse name']
          if (!permissionActionsIds.idRole) return ['Missing id Role']
          if (!permissionActionsIds.idResourse) return ['Missing id Resourse']
          if (!permissionActionsIds.idAction) return ['Missing id Action']
          return [
               undefined,
               new AddPermissionsByRoleDto(permissionId, roleName, resourseName, permissionActionsIds)
          ];
     }

}