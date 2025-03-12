
export class UpdateRoleDto {
     constructor(
          public id: string,
          public roleName: string,
          public roleDescription: string | null
     ) { }

     static create(object: { [key: string]: any }): [string?, UpdateRoleDto?] {
          const { id, roleName, roleDescription } = object;
          //NOTE: Se valida undefined porque permite valor nulo
          if (id === undefined) return ['Missing role ID on update role']
          if (roleName === undefined) return ['Missing role name on update role']
          if (roleDescription === undefined) return ['Missing role description on update role']

          return [
               undefined,
               new UpdateRoleDto(id, roleName, roleDescription)
          ];
     }

}