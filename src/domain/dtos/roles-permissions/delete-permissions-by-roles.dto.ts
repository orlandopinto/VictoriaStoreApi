
export class DeletePermissionsByRoleDto {
     constructor(
          public roleName: string,
          public resourseName: string,
          public hasError: boolean,
          public message: string
     ) { }

     static delete(object: { [key: string]: any }): [string?, DeletePermissionsByRoleDto?] {
          let { roleName, resourseName, hasError, message } = object
          return [
               undefined,
               new DeletePermissionsByRoleDto(roleName, resourseName, hasError, message)
          ];
     }

}