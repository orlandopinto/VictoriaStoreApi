
export class AddPermissionsByRoleDto {
     constructor(
          public id: string,
          public roleId: string,
          public roleName: string,
          public resourseId: string,
          public resourseName: string,
          public actionId: string,
          public actionName: string
     ) { }

     static create(object: { [key: string]: any }): [string?, AddPermissionsByRoleDto?] {
          const { id, roleId, roleName, resourseId, resourseName, actionId, actionName } = object;
          // ********* VALIDAR TODOS LOS CAMPOS QUE SON OBLIGATORIOS *********

          if (!id) return ['Missing id on create permission']
          if (!roleId) return ['Missing role id on create permission']
          if (!roleName) return ['Missing role name on create permission']
          if (!resourseId) return ['Missing resourse ID on create permission']
          if (!resourseName) return ['Missing resourse name on create permission']
          if (!actionId) return ['Missing action ID on create permission']
          if (!actionName) return ['Missing action name on create permission']

          // ********************** FIN DE LA VALIDACIÓN *********************
          return [
               undefined,
               new AddPermissionsByRoleDto(id, roleId, roleName, resourseId, resourseName, actionId, actionName)
          ];
     }

}