
export class AddRoleDto {
     constructor(
          public roleName: string
     ) { }

     //primer argumento es el mensaje de error y el segundo argumento va a ser la instancia de DTO
     //nota lo de abajo es una Tupla
     static create(object: { [key: string]: any }): [string?, AddRoleDto?] {
          const { roleName } = object;
          if (!roleName) return ['Missing role name']

          return [
               undefined,
               new AddRoleDto(roleName)
          ];
     }

}