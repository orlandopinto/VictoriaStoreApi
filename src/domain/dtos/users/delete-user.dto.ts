
export class DeleteUserDto {

     constructor(
          public email: string
     ) { }

     static delete(object: { [key: string]: any }): [string?, DeleteUserDto?] {

          const { email } = object;

          if (email === undefined) return ['Missing email on delete User']

          return [
               undefined,
               new DeleteUserDto(email)
          ];
     }

}
