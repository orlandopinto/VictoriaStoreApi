
export class DeleteRoleDto {
     constructor(
          public roleName: string,
          public hasError: boolean | undefined,
          public errorMessage: string[]
     ) { }

     //primer argumento es el mensaje de error y el segundo argumento va a ser la instancia de DTO
     //nota lo de abajo es una Tupla
     static delete(object: { [key: string]: any }): [string?, DeleteRoleDto?] {
          const { roleName, hasError, errorMessage } = object;

          if (!roleName) return ['Missing role name on delete role']

          return [
               undefined,
               new DeleteRoleDto(roleName, hasError, errorMessage)
          ];
     }

}