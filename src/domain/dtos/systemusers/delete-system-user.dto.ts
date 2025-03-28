
export class DeleteSystemUserDto {

     constructor(
          public email: string
     ) { }

     static delete(object: { [key: string]: any }): [string?, DeleteSystemUserDto?] {

          const { email } = object;

          if (email === undefined) return ['Missing email on delete user']

          return [
               undefined,
               new DeleteSystemUserDto(email)
          ];
     }

}
