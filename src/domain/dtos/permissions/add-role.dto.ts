
export class AddRoleDto {
     constructor(
          public roleName: string,
          public roleDescription: string | null,
          public hasError: boolean | undefined,
          public errorMessage: string[]
     ) { }

     static create(object: { [key: string]: any }): [string?, AddRoleDto?] {
          const { roleName, roleDescription, hasError, errorMessage } = object;
          if (!roleName) return ['Missing role name on create role']
          //NOTE: Se valida undefined porque permite valor nulo
          if (roleDescription === undefined) return ['Missing role description on create role']

          return [
               undefined,
               new AddRoleDto(roleName, roleDescription, hasError, errorMessage)
          ];
     }

}