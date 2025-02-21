
export class DeleteRoleDto {
     constructor(
          public roleName: string
     ) { }

     //primer argumento es el mensaje de error y el segundo argumento va a ser la instancia de DTO
     //nota lo de abajo es una Tupla
     static delete(object: { [key: string]: any }): [string?, DeleteRoleDto?] {
          const { roleName } = object;

          if (!roleName) return ['Missing role name on delete role']

          return [
               undefined,
               new DeleteRoleDto(roleName)
          ];
     }

}