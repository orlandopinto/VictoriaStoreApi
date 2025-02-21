
export class AddRoleDto {
     constructor(
          public roleName: string,
          public roleDescription: string | null
     ) { }

     static create(object: { [key: string]: any }): [string?, AddRoleDto?] {
          const { roleName, roleDescription } = object;
          if (!roleName) return ['Missing role name on create role']
          //NOTE: Se valida undefined porque permite valor nulo
          if (roleDescription === undefined) return ['Missing role description on create role']

          return [
               undefined,
               new AddRoleDto(roleName, roleDescription)
          ];
     }

}